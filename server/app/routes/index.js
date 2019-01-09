var express = require('express');
var router = express.Router();
const uuid = require('uuid/v4');
const shortid = require('shortid');
var helper = require('./helper');
var db = require('./../config/db');
var config = require('./../config/config');
var constants = require('../constants/constants');

var web3Conf = process.env.Web3Conf||false;

if (web3Conf) {
	var init = require('../web3Helpers/init.js');
	var web3 = init.web3;
	var landRecords = require('../web3Helpers/landRecords.js');
	var landRegistry = require('../web3Helpers/landRegistry.js');
}

router.get('/getFinancers', async function(req, res) {
	console.log('getFinancers : start');
    helper.getRecords('users',{'role' : 'bank'}, function(err, data) {
        if (err) {
			let error = helper.getErrorResponse('DBError');
			return res.status(error.statusCode).send(error.error);
        }
        return res.send({status : true, data : data});
    });																																																																																																																								
});

router.get('/getStampdutySummary', async function(req, res) {
	console.log('getFinancers : start');
	var day = Date.now() - (1000 * 60 * 60 * 24);
	var week = Date.now() - (1000 * 60 * 60 * 24 * 7);
	var month = Date.now() - (1000 * 60 * 60 * 24 * 30);
	var year = Date.now() - (1000 * 60 * 60 * 24 * 365);

	var collection = db.getCollection('registry');

	/*let p = await collection.aggregate([
	    {
	        "$match": {
	            "created": { "$lte": Date.now(), "$gte":  month}
	        }
	    },
	    {
	        "$group": {
	            "_id": null,
	            "total": { "$sum": "$stampDuty" },
	            "count": { "$sum": 1 }
	        }
	    }
	]).toArray();*/

    let q = await collection.find({}).toArray();

	var dayStats = q.reduce(function(total, obj) {
      return total + (
      	(obj.status == 'registry_stamp_duty' && obj.modified > day) ?
      	obj.stampDuty||0 : 0);
    },0);

	var weekStats = q.reduce(function(total, obj) {
      return total + (
      	(obj.status == 'registry_stamp_duty' && obj.modified > week) ?
      	obj.stampDuty||0 : 0);
    },0);

	var monthStats = q.reduce(function(total, obj) {
      return total + (
      	(obj.status == 'registry_stamp_duty' && obj.modified > month) ?
      	obj.stampDuty||0 : 0);
    },0);

	var yearStats = q.reduce(function(total, obj) {
      return total + (
      	(obj.status == 'registry_stamp_duty' && obj.modified > year) ?
      	obj.stampDuty||0 : 0);
    },0);

	var pendingStats = q.reduce(function(total, obj) {
      return total + (
      	(obj.status != 'registry_stamp_duty') ?
      	obj.stampDuty||0 : 0);
    },0);

	var summary = {
			day : dayStats,
			week : weekStats,
			month : monthStats,
			year : yearStats,
			pending : pendingStats
		};
    return res.send({status : true, data : summary});
});


router.post('/getDashboard', async function(req, res) {
	console.log('getDashboard : start');
	let email = req.body.email;
	let role = req.body.role;

	let query = {};
	if (role == 'individual') {
		query = {$or : [{owner : email}, {buyer : email}]}
	} else if (role == 'bank') {
		query = {$or : [{ownerFinancer : email}, {buyerFinancer : email}]};
	}

    try {
    	let records = [];
    	if (role != "bank") {
			var collection = db.getCollection('properties');
			query = {"$and" : [{isNewProperty : true}]};
			if (role == "individual") {
				query["$and"].push({"owner.email" : email});
			} else {
				query["$and"].push({"status" : {"$ne" : "property_rejected"}});
			};
	        let p = await collection.find(query).sort({'created' : -1}).toArray();
	        records = records.concat(p);
    	}

		var collection = db.getCollection('registry');
		query = {};
		if (role == 'bank') {
			query = {$or : [
				{"ownerFinancer.email" : email},
				{"buyerFinancer.email" : email}
			]};
		} else if (role == 'individual') {
			query = {$or : [
				{"owner.email" : email},
				{"buyer.email" : email}
			]};
		}
		//console.log("query", query);
        let q = await collection.find(query).sort({_id : -1}).toArray();
        records = records.concat(q);
	    records.sort(function(x, y){
	        return y.created - x.created;
	    });   

	    if (role == 'igr') {
			for (var i in records) {
				records[i].txType = 'Sale';
				records[i].stampDutyDate = (records[i].status == 'registry_stamp_duty') ?
								records[i].modified : false;
			}
	    }

		return res.send({status : true, data : records});
	} catch(err) {
		console.log(err);
        let error = helper.getErrorResponse('DBError');
		return res.status(error.statusCode).send(error.error);
    }
});

router.post('/signup', helper.isUserExist, function(req, res) {
	console.log('signup : start')
	let userDetails = req.body.userDetails;
	if (!userDetails || !userDetails.email) {
   	 	let error = helper.getErrorResponse('EmptyResource');
   	 	error.field = 'Email';
		return res.status(error.statusCode).send(error);
	} else {
		userDetails.email = userDetails.email.toLowerCase();
	}
	if (web3Conf) {
		//create a new address => personal.newAccount()
		userDetails.address = init.createAccount('123');
		console.log('address', userDetails.address);
		userDetails.passPhrase = '123';
	} else {
		userDetails.address = "0x0638e1574728b6d862dd5d3a3e0942c3be47d996";
		userDetails.passPhrase = '123';
	}
	helper.addUser(userDetails, async function(err, data) {
	    if (err) {
	        console.log(err);
       	 	let error = helper.getErrorResponse('DBError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true, message: 'User added successfully.'});
	});
});

router.post('/login', function(req, res) {
	console.log('login : start')
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		let error = helper.getErrorResponse('MissingParameter');
		return res.status(error.statusCode).send(error.error);
	}
	email = email.toLowerCase();
	helper.getUserDetails({email : email, password : password}, function(err, data) {
	    if (err) {
			console.log('login error:', err);
			let error = helper.getErrorResponse('IncorrectEmailOrPassword');
			return res.status(error.statusCode).send(error.error);
	    }
	    if (!data.name) {
	    	data.name = helper.getName(data.firstName, data.lastName);
	    }
	    return res.send({status : true, data : data});
	});
});

router.post('/getBalance', async function(req, res) {
	console.log('getBalance : start')
	let address = req.body.address;
	console.log(address)
	if (!address) {
		let error = helper.getErrorResponse('MissingParameter');
		return res.status(error.statusCode).send(error.error);
	}
	if (web3Conf) {
		try {
	        var balance = await landRegistry.getBalance(address);
	        res.send({balance : balance.toNumber()});
		} catch(e) {
			res.send({err : e});
		}
	} else {
		res.send({balance : 0});
	}
});

router.post('/buyTokens', async function(req, res) {
	console.log('login : start');
	let address = req.body.address;
	let amount = req.body.amount;
	if (!address || !amount) {
		let error = helper.getErrorResponse('MissingParameter');
		return res.status(error.statusCode).send(error.error);
	}
	if (web3Conf) {
		try {
	        var buyTokens = await landRegistry.buyTokens(address, amount);
	        res.send({status : true});
		} catch(e) {
			console.log(e);
			return res.send({status : false, error : e});
		}
	} else {
		return res.send({status : true});
	}
});

router.get('/getUserDetails', function(req, res) {
	console.log('getUserDetails : start')
	let email = req.params.email || req.query.email;
	helper.getUserDetails({email : email}, function(err, data) {
	    if (err) {
			console.log('error:', err, 'data:',data);
			let error = helper.getErrorResponse(data);
			return res.status(error.statusCode).send(error.error);
		}
		return res.send({status : true, data: data});
	});
});

router.get('/getPropertyDetails', function(req, res) {
	console.log('getPropertyDetails : start')
	let propertyId = req.params.propertyId || req.query.propertyId;
	console.log('propertyId', propertyId)
	var responseData = {};

	helper.getRecord('properties', {propertyId : propertyId}, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    console.log(err, data);
	    var propertyDetails = data;
	    var status = data.status;
	    var owner = data.owner;
	    responseData.property = propertyDetails;
	    var statusNo = helper.propertyStatusMap[status];
	    if (statusNo < 5) {
			helper.getUserDetails({email : owner}, function(err, data) {
			    if (err) {
			        return res.send({status : false, error : err});
			    }
			    responseData.owner = data;
			    return res.send({status : true, data : responseData});
			});
	    } else {
	    	var registryId = propertyDetails.registryId;
			helper.getRecord('registry', {registryId : registryId}, function(err, data) {
			    if (err) {
			        return res.send({status : false, error : err});
			    }
			    return res.send({status : true, data : data});
			});
	    }
	});
});


router.get('/getUsers', function(req, res) {
	console.log('getUsers : start')
	helper.getUsers({}, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true, data : data});
	});
});

router.get('/getPropertyData', async function(req, res) {
	console.log('getPropertyData : start')
	let registryId = req.query.registryId||req.params.registryId;
	let propertyId = req.query.propertyId||req.params.propertyId;
	let allData = false;
	if (registryId) {
		var collection = db.getCollection('registry');
	    allData = await collection.findOne({registryId : registryId});
		propertyId = allData.propertyId;
	}
	var collection = db.getCollection('properties');
    let propertyDetails = await collection.findOne({propertyId : propertyId});
    let userList = [];
    if (!allData) {
		userList.push(propertyDetails.owner.email);
    } else {
    	if (allData.owner && allData.owner.email) {
    		userList.push(allData.owner.email);
    	}
    	if (allData.ownerFinancer && allData.ownerFinancer.email) {
    		userList.push(allData.ownerFinancer.email);
    	}
    	if (allData.buyer && allData.buyer.email) {
    		userList.push(allData.buyer.email);
    	}
    	if (allData.buyerFinancer && allData.buyerFinancer.email) {
    		userList.push(allData.buyerFinancer.email);
    	}
    }

	var collection = db.getCollection('users');
    let userDetails = await collection.find({email : {$in : userList}}).toArray();
    userDetails = helper.arrayToObject(userDetails, "email");

    let responseData = {};
    if (!allData) {
    	responseData.propertyId = propertyId;
    	responseData.propertyDetails = propertyDetails;
    	responseData.owner = propertyDetails.owner;
    	responseData.owner.userDetails = userDetails[propertyDetails.owner];
    	responseData.status = propertyDetails.status;
    } else {
 	  	allData.propertyDetails = propertyDetails;
    	if (allData.owner && allData.owner.email) {
    		allData.owner.userDetails = userDetails[allData.owner.email];
    	}
    	if (allData.ownerFinancer && allData.ownerFinancer.email) {
    		allData.ownerFinancer.userDetails = userDetails[allData.ownerFinancer.email];
    	}
    	if (allData.buyer && allData.buyer.email) {
    		allData.buyer.userDetails = userDetails[allData.buyer.email];
    	}
    	if (allData.buyerFinancer && allData.buyerFinancer.email) {
    		allData.buyerFinancer.userDetails = userDetails[allData.buyerFinancer.email];
    	}
    	responseData = allData;
    }
    responseData.currentTab = constants.statusToTabMap[responseData.status];

    return res.send({status : true, data : responseData});
});

router.post('/getExplorer', async function(req, res) {
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let data, data1, data2;
	if (web3Conf) {
	    try {
			data1 = await landRecords.getAllEvents(propertyId);
			if (!registryId) {
				data2 = [];
			} else {
				data2 = await landRegistry.getAllEvents(registryId);
			}
			data = {propertyData : data1, registryData : data2};
	    } catch(err) {
			console.log('error', err);
			let error = helper.getErrorResponse('InternalError');
			return res.status(error.statusCode).send(error.error);
		}
	} else {
		data = constants.dummyExplorerData;
	}

	data.txFlag = data.registryData.reduce(function(result, obj) {
		return result || (obj.event == 'TransferTokens' ? true : false);
	}, false);

    return res.send({status : true, data : data});
});

router.post('/addProperty', async function(req, res) {
	console.log('addPorperty : start');
	let propertyDetails = req.body.propertyDetails;
	propertyDetails.propertyId = shortid.generate();
	propertyDetails.isNewProperty = true;
	propertyDetails.status = 'property_new';
	propertyDetails.created = Date.now();
	propertyDetails.modified = Date.now();

	if (
		!propertyDetails ||
		!propertyDetails.propertyId ||
		!propertyDetails.surveyNo ||
		!propertyDetails.landType ||
		!propertyDetails.constructedArea ||
		!propertyDetails.openParking ||
		!propertyDetails.coveredParking ||
		!propertyDetails.shopFloor ||
		!propertyDetails.owner.address ||
		!propertyDetails.status
	) {
		let error = helper.getErrorResponse('ResourceNotFound');
		return res.status(error.statusCode).send(error.error);
	}

	if (web3Conf) {
	    try {
	        var m;
	        m = await landRecords.addProperty(
	            helper.web3StringToBytes32(propertyDetails.propertyId),
	            helper.web3StringToBytes32(propertyDetails.surveyNo),
	            helper.web3StringToBytes32(propertyDetails.landType),
	            parseInt(propertyDetails.constructedArea),
	            parseInt(propertyDetails.openParking),
	            parseInt(propertyDetails.coveredParking),
	            parseInt(propertyDetails.shopFloor),
	            propertyDetails.owner.address,
	            helper.web3StringToBytes32(propertyDetails.status)
	        );
	        console.log("addProperty", m);
	    } catch(err) {
	        console.log('addPorperty error', err);
			let error = helper.getErrorResponse('InternalError');
			return res.status(error.statusCode).send(error.error);
	    }
	}
	helper.insertCollection('properties', propertyDetails, function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    //add property on blockchain
	    return res.send({status : true, data : propertyDetails});
	});
});

router.post('/confirmProperty', async function(req, res) {
	console.log('confirmProperty : start');
	//verify token (email and role)
	let propertyId = req.body.propertyId;
	let status = req.body.status; //new, verified, rejected
	let query = {propertyId : propertyId};
	let updateQuery = {$set : {status : status, modified : Date.now()}};
	if (web3Conf) {
	    try {
	        var m;
	        m = await landRecords.setStatus(
	            helper.web3StringToBytes32(propertyId),
	            helper.web3StringToBytes32(status)
	        );
	        console.log("setStatus", m);
	    } catch(err) {
	        console.log(err);
	    }
	}

	helper.updateCollection('properties', query,
		updateQuery, function(err, data) {
	    if (err) {
			console.log('db error:', err);
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/sellProperty', async function(req, res) {
	console.log('sellProperty : start');
	let body = req.body;
	let [propertyId, owner, sellPrice, tokenAmt] = [
		body.propertyId,
		body.owner,
		parseInt(body.sellPrice) || 0,
		parseInt(body.tokenAmt) || 0
	];

	if (!propertyId || !owner || !owner.email ||
		!owner.address || !sellPrice || !tokenAmt) {
		let error = helper.getErrorResponse('ResourceNotFound');
		return res.status(error.statusCode).send(error.error);
	}

	if (tokenAmt > sellPrice) {
		let error = helper.getErrorResponse('TokenAmtCheck');
		return res.status(error.statusCode).send(error.error);
	}

	let registryId = shortid.generate();
	let query = {propertyId : propertyId};
	let updateQuery = {
		$set : {
			isNewProperty : false,
			modified : Date.now(),
			onSale : true
		}
	};

	let propertyDetails = {};
	let collection = db.getCollection('properties');
	try {
		propertyDetails = await collection.findOne({propertyId : propertyId});
	} catch(e) {
		console.log('DbError', e);
		let error = helper.getErrorResponse('DBError');
		return res.status(error.statusCode).send(error.error);
	}
	helper.updateCollection('properties', query,
		updateQuery, async function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }

	    if (web3Conf) {
		    try {
		        var m = await landRegistry.addRegistryRecord(
		            helper.web3StringToBytes32(registryId),
		            helper.web3StringToBytes32(propertyId),
		            owner.address,
		            parseInt(sellPrice),
		            parseInt(tokenAmt)
		        );
		        console.log('addRegistryRecord', m);
		    } catch(e) {
		    	console.log(e);
		    }
	    }

	   	//console.log(data);
	   	let stampDuty = Math.round((sellPrice * 5)/100);
	   	stampDuty += (sellPrice/100 < 30000) ? 30000 : Math.round(sellPrice/100);
		query = {
			registryId : registryId,
			propertyId : propertyId,
			propertyDetails : propertyDetails,
			owner : owner,
			sellPrice : sellPrice,
			tokenAmt : tokenAmt,
			stampDuty : stampDuty, 
			paymentRemaining : sellPrice,
			status : "registry_new",
			created : Date.now(),
			modified : Date.now()
		};
		helper.insertCollection('registry', query,
			function(err, data) {
		    if (err) {
		        return res.send({status : false, error : err});
		    }
		    return res.send({status : true,
		    	data : {propertyId : propertyId, registryId : registryId}
		    });
		});
	});
});

router.post('/addOwner', async function(req, res) {
	console.log('addOwner : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let ownerDetails = req.body.owner;
	if (!ownerDetails.email || !ownerDetails.address) {
		console.log('improper data : incorrect ownerDetails');
		let error = helper.getErrorResponse('ResourceNotFound');
		return res.status(error.statusCode).send(error.error);
	}
	let query = {registryId : registryId};
	let updateQuery = {
		$set : {
			owner : ownerDetails,
			status : 'registry_owner',
			modified : Date.now()
		}
	};
	console.log(registryId, propertyId);
	if (web3Conf) {
		try {
	        m = await landRegistry.setStatus(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            helper.web3StringToBytes32("registry_owner")
	        );
		} catch(e) {
			console.log('addowner error', e);
			let error = helper.getErrorResponse('InternalError');
			return res.status(error.statusCode).send(error.error);
		}
	}

	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			console.log('error:', err, 'data:',data);
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/addOwnerFinancer', async function(req, res) {
	console.log('addOwnerFinancer : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let ownerFinancer  = req.body.ownerFinancer || false;

	if (ownerFinancer && !ownerFinancer.email) {
		console.log('ownerFinancer : improper data');
		let error = helper.getErrorResponse('ResourceNotFound');
		return res.status(error.statusCode).send(error.error);
	}

	if (ownerFinancer && (!ownerFinancer.loanAmount || !ownerFinancer.outstandingLoan)) {
		let error = helper.getErrorResponse('ResourceNotFound');
		return res.status(error.statusCode).send(error.error);
	}

	let collection = db.getCollection('registry');
	let registryData = await collection.findOne({registryId : registryId});
	let sellPrice = parseInt(registryData.sellPrice);

	if (ownerFinancer && (parseInt(ownerFinancer.loanAmount) > sellPrice)) {
		let error = helper.getErrorResponse('LoanAmountCheck');
		return res.status(error.statusCode).send(error.error);
	}

	if (ownerFinancer && (parseInt(ownerFinancer.outstandingLoan) > parseInt(ownerFinancer.loanAmount))) {
		let error = helper.getErrorResponse('OutstandingLoanCheck');
		return res.status(error.statusCode).send(error.error);
	}

	let status = req.body.status || (
		!ownerFinancer ?
		"registry_skip_owner_financer" : "registry_owner_financer"
	);

	if (ownerFinancer) {
		ownerFinancer.loanAmount = parseInt(ownerFinancer.loanAmount);
		ownerFinancer.outstandingLoan = parseInt(ownerFinancer.outstandingLoan);
	}

	if (web3Conf && status == 'registry_owner_financer') {
		ownerFinancer.address = ownerFinancer.address || web3.eth.coinbase;
		try {
	        var m = await landRegistry.addOwnerFinancer(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            ownerFinancer.address,
	            parseInt(ownerFinancer.loanAmount),
	            parseInt(ownerFinancer.outstandingLoan)
	        );
	        console.log('addOwnerFinancer', m)
		} catch(e) {
			console.log(e);
			let error = helper.getErrorResponse('DBError');
			return res.status(error.statusCode).send(error.error);
		}
	}

	let query = {registryId : registryId};
	let updateQuery = {$set : {
		ownerFinancer : ownerFinancer,
		status : status,
		modified : Date.now()
	}};

	console.log('ownerFinancer', ownerFinancer);

	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/confirmFinancer', async function(req, res) {
	console.log('confirmFinancer : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let currentStatus= req.body.currentStatus;
	let approved = req.body.approved;
	let status = false;
	if (!currentStatus) {
		console.log('confirmFinancer error');
		let error = helper.getErrorResponse('DBError');
		return res.status(error.statusCode).send(error.error);
	}
	switch(currentStatus) {
		case 'registry_owner_financer' :
			status = (approved ? "registry_owner_financer_verified" :
			"registry_owner_financer_rejected");
			break;
		case 'registry_buyer_financer' :
			status = (approved ? "registry_buyer_financer_verified" :
			"registry_buyer_financer_rejected");
	}
	console.log('status', status);

	if (web3Conf) {
		try {
	       m = await landRegistry.setStatus(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            helper.web3StringToBytes32(status)
	        );
		}catch(e) {
			console.log(e);
			return res.send({status : false, error : e});	
		}
	}

	let query = {registryId : registryId};
	let updateQuery = {$set : {
		status : status,
		modified : Date.now()
	}};
	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/addBuyer', async function(req, res) {
	console.log('addBuyer : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let buyerDetails = req.body.buyer;
	let query = {registryId : registryId};

	if (
		!registryId || !propertyId ||
		!buyerDetails || !buyerDetails.email
	) {
		let error = helper.getErrorResponse('ResourceNotFound');
		return res.status(error.statusCode).send(error.error);
	}

	try {
		let collection = db.getCollection('registry');
		let registryData;
		registryData = await collection.findOne({registryId : registryId});
		if (registryData.owner.email == buyerDetails.email) {
			let error = helper.getErrorResponse('InvalidBuyer');
			return res.status(error.statusCode).send(error.error);
		}

		collection = db.getCollection('users');
	    let users = await collection.find({email : buyerDetails.email}).toArray();

	    if(users.length == 0) {
			let error = helper.getErrorResponse('InvalidEmail');
			return res.status(error.statusCode).send(error.error);
	    }
		buyerDetails.address = users[0].address;
	} catch(e) {
		console.log(e)
	}

	console.log('addBuyer', buyerDetails);

	let updateQuery = {
		$set : {
			buyer : buyerDetails,
			status : 'registry_buyer',
			modified : Date.now()
		}
	};

    if (web3Conf) {
		try {
		    m = await landRegistry.addBuyer(
		        helper.web3StringToBytes32(registryId),
		        helper.web3StringToBytes32(propertyId),
		        buyerDetails.address || '0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e'
		    );
		    console.log('addBuyer', m)
		} catch(e) {
			console.log(e);
			return res.send({status : false, error : e});     
		}
    }

	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/confirmBuyer', async function(req, res) {
	console.log('confirmBuyer : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let status = req.body.status;
	let query = {registryId : registryId};
	let updateQuery = {
		$set : {status : status, modified : Date.now()}
	};

    if (web3Conf) {
		try {
	        m = await landRegistry.setStatus(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            helper.web3StringToBytes32(status)
	        );
		    console.log('addBuyer', m);
		} catch(e) {
			console.log(e);
			return res.send({status : false, error : e});
		}
    }

	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/addBuyerFinancer', async function(req, res) {
	console.log('addBuyerFinancer : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;

	let buyerFinancer  = req.body.buyerFinancer || false;
	console.log('addBuyerFinancer', buyerFinancer);
	if (!buyerFinancer.address) {
		buyerFinancer.address = "0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc";
	}
	let status = req.body.status || (
		!buyerFinancer ?
		"registry_skip_buyer_financer" : "registry_buyer_financer"
	);

	let collection = db.getCollection('registry');
	let registryData = await collection.findOne({registryId : registryId});
	let sellPrice = registryData.sellPrice;

	if (buyerFinancer && (!buyerFinancer.email || !buyerFinancer.financeAmount)) {
		let error = helper.getErrorResponse('ResourceNotFound');
		return res.status(error.statusCode).send(error.error);
	}

	if (buyerFinancer && buyerFinancer.financeAmount > sellPrice) {
		let error = helper.getErrorResponse('FinanceAmountCheck');
		return res.status(error.statusCode).send(error.error);
	}

	if (buyerFinancer) {
		buyerFinancer.financeAmount = parseInt(buyerFinancer.financeAmount);
	}

    if (web3Conf && status == 'registry_buyer_financer') {
		try {
	        m = await landRegistry.addBuyerFinancer(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            buyerFinancer.address || '0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc',
	            parseInt(buyerFinancer.financeAmount)
	        );
		    console.log('addBuyerFinancer', m);
		} catch(e) {
			console.log(e);
			return res.send({status : false, error : e});
		}
    }

	let query = {registryId : registryId};
	let updateQuery = {$set : {
		buyerFinancer : buyerFinancer,
		status : status,
		modified : Date.now()
	}};
	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/payTokenAmount', async function(req, res) {
	console.log('payTokenAmount : start');
	let registryId = req.body.registryId;
	let query = {registryId : registryId};
	//return if no balance
	let collection = db.getCollection('registry');
	let registryData;
	try {
		registryData = await collection.findOne(query);
	} catch(e) {
		console.log(e)
	}

	let tokenAmt = registryData.tokenAmt || 0;
	//transfer amount from buyer to owner
	let paymentRemaining = registryData.paymentRemaining || 0;
	paymentRemaining -= tokenAmt;

    if (web3Conf) {
		let owner = registryData.owner ? registryData.owner.address : null;
		let buyer = registryData.buyer ? registryData.buyer.address : null;

		console.log('buyer', buyer)
        let balance = await landRegistry.getBalance(buyer);
        console.log('balance', balance.toNumber());
        if (balance.toNumber() < tokenAmt) {
        	return res.send({status : false, msg : "No Enough Balance"});
        }

		console.log('payTokenAmount', buyer, owner, parseInt(tokenAmt));
	    if (owner && buyer) {
			let m = await landRegistry.sendTokens(buyer, owner, 500);
			console.log('payTokenAmount', m);
			console.log('payTokenAmount', registryId, registryData.propertyId, buyer, owner, tokenAmt);

	        m = await landRegistry.customTransferEvent(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(registryData.propertyId),
	            helper.web3StringToBytes32("token_amt"),
	            buyer,
	            owner,
	            parseInt(tokenAmt),
	        );
	        console.log('customTransferEvent', m);
	    }
    }

	let updateQuery = {$set : {
		paymentRemaining : paymentRemaining,
		status : "registry_token_amount",
		modified : Date.now()
	}};

	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/financerPayment', async function(req, res) {
	console.log('financerPayment : start');
	let registryId = req.body.registryId;
	let query = {registryId : registryId};
	//return if no balance
	let collection = db.getCollection('registry');
	let registryData;
	try {
		registryData = await collection.findOne(query);
	} catch(e) {
		console.log(e);
	}
	if (!registryData.buyerFinancer) {
		return res.send({status : false, error : 'financer not available'})
	}
	let financeAmount = parseInt(registryData.buyerFinancer.financeAmount);
	let outstandingLoan = (!registryData.ownerFinancer) ? 0 :
		parseInt(registryData.ownerFinancer.outstandingLoan);
	let paymentRemaining = parseInt(registryData.paymentRemaining) || 0;
	//if (buyerFinancer.balance < financeAmount) => return("insufficient balance");

    let fAmt, oAmt;
    console.log('financeAmount', financeAmount, 'outstandingLoan', outstandingLoan);
	if (financeAmount > outstandingLoan) {
		//transfer(buyerFinancer, ownerFinancer, outstandingLoan)
		fAmt = outstandingLoan;
		paymentRemaining -= outstandingLoan;
		oAmt = financeAmount - outstandingLoan;
		outstandingLoan = 0;
		//transfer(buyerFinancer, owner, fAmt)
		paymentRemaining -= oAmt;
	} else {
		//transfer(buyerFinancer, ownerFinancer, financeAmount)
		fAmt = financeAmount;
		oAmt = 0;
		paymentRemaining -= financeAmount;
		outstandingLoan -= financeAmount;		
	}
	console.log('fAmt', fAmt, 'oAmt', oAmt)
    if (web3Conf) {
    	let ownerFinancer = registryData.ownerFinancer.address;
    	let buyerFinancer = registryData.buyerFinancer.address;
    	let owner = registryData.owner.address;

        let balance = await landRegistry.getBalance(buyerFinancer);
        if (balance.toNumber() < financeAmount) {
        	return res.send({status : false, msg : "No Enough Balance"});
        }

	    console.log(ownerFinancer, buyerFinancer, owner);
		if (fAmt > 0) {
			let m = await landRegistry.sendTokens(buyerFinancer, ownerFinancer, fAmt); //fAmt
	        m = await landRegistry.customTransferEvent(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(registryData.propertyId),
	            helper.web3StringToBytes32("buyerFin_to_ownerFin"),
	            buyerFinancer,
	            ownerFinancer,
	            parseInt(fAmt),
	        );
	        console.log('customTransferEvent', m);
		}
		if (oAmt > 0) {
			let m = await landRegistry.sendTokens(buyerFinancer, owner, oAmt); //oAmt
	        m = await landRegistry.customTransferEvent(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(registryData.propertyId),
	            helper.web3StringToBytes32("buyerFin_to_owner"),
	            buyerFinancer,
	            owner,
	            parseInt(oAmt),
	        );
	        console.log('customTransferEvent', m);
		}
    }

	let updateQuery = {$set : {
		paymentRemaining : paymentRemaining,
		"ownerFinancer.outstandingLoan" : outstandingLoan,
		status : "registry_bank_pay",
		modified : Date.now()
	}};
	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true});
	});
});

router.post('/buyerPayment', async function(req, res) {
	console.log('buyerPayment : start');
	let registryId = req.body.registryId;
	let query = {registryId : registryId};
	//return if no balance
	let collection = db.getCollection('registry');
	let registryData;
	try {
		registryData = await collection.findOne(query);
	} catch(e) {
		console.log(e)
	}
	let outstandingLoan = (!registryData.ownerFinancer) ? 0 :
		registryData.ownerFinancer.outstandingLoan;
	let paymentRemaining = registryData.paymentRemaining || 0;

	let fAmt, oAmt;
	let tAmt  = paymentRemaining;
	//if (buyer.getBalance() < paymentRemaining) => return("insufficientBalance");
	if (outstandingLoan > 0) {
		//transfer(buyer, ownerFinancer, outstandingLoan)
		fAmt = outstandingLoan;
		paymentRemaining -= outstandingLoan;
		outstandingLoan = 0;
	} else {
		fAmt = 0;
	}

	//transfer(buyer, owner, paymentRemaining)
	oAmt = paymentRemaining;
	paymentRemaining = 0;

    if (web3Conf) {
    	let ownerFinancer = registryData.ownerFinancer.address || null;
    	let buyer = registryData.buyer.address;
    	let owner = registryData.owner.address;

        let balance = await landRegistry.getBalance(buyer);
        if (balance.toNumber() < tAmt) {
        	return res.send({status : false, msg : "No Enough Balance"});
        }
        console.log("fAmt", fAmt);
	    console.log(owner, buyer, ownerFinancer);
		if (fAmt > 0) {
			let m = await landRegistry.sendTokens(buyer, ownerFinancer, fAmt); //fAmt
	        m = await landRegistry.customTransferEvent(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(registryData.propertyId),
	            helper.web3StringToBytes32("buyer_to_ownerFin"),
	            buyer,
	            ownerFinancer,
	            parseInt(fAmt),
	        );
	        console.log('customTransferEvent', m);
		}
		if (oAmt > 0) {
			let m = await landRegistry.sendTokens(buyer, owner, oAmt); //oAmt
	        m = await landRegistry.customTransferEvent(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(registryData.propertyId),
	            helper.web3StringToBytes32("buyer_to_owner"),
	            buyer,
	            owner,
	            parseInt(oAmt),
	        );
	        console.log('customTransferEvent', m);
		}
    }

	let updateQuery = {$set : {
		paymentRemaining : paymentRemaining,
		status : "registry_buyer_pay",
		modified : Date.now()
	}};

	if (registryData.buyerFinancer) {
		updateQuery["$set"]["buyerFinancer.outstandingLoan"] = outstandingLoan;
	}

	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
	    	console.log('DbError', err, data);
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/payStampDuty', async function(req, res) {
	//doownertransfership

	console.log('payStampDuty : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId || "hgtfyhgg";

	let query = {registryId : registryId};
	//return if no balance
	let updateQuery = {$set : {
		stampDutyRemaining : 0,
		status : "registry_stamp_duty",
		modified : Date.now()
	}};

	helper.updateCollection('registry', query, updateQuery,
		async function(err, data) {
	    if (err) {
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    if (web3Conf) {
			var collection = db.getCollection('registry');
		    let allData = await collection.findOne({registryId : registryId});
		    console.log('sendTokens', allData.owner.address,  web3.eth.coinbase, allData.stampDuty);
		    if (allData.owner && allData.buyer) {
		        let balance = await landRegistry.getBalance(allData.owner.address);
		        if (balance.toNumber() < allData.stampDuty) {
		        	return res.send({status : false, msg : "No Enough Balance"});
		        }
				let m = await landRegistry.sendTokens(allData.owner.address, web3.eth.coinbase, allData.stampDuty);
				console.log('payStampDuty', m);

		        m = await landRegistry.customTransferEvent(
		            helper.web3StringToBytes32(registryId),
		            helper.web3StringToBytes32(allData.propertyId),
		            helper.web3StringToBytes32("stampDuty"),
		            allData.owner.address,
		            web3.eth.coinbase,
		            parseInt(allData.stampDuty)
		        );
		        console.log('customTransferEvent', m);

				console.log("allData propertyId", allData.propertyId);
		        m = await landRecords.addOwner(
		            helper.web3StringToBytes32(allData.propertyId),
		            allData.owner.address
		        );
				console.log('addOwner', m);
		    }
	    }
	    return res.send({status : true});
	});
});

router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;