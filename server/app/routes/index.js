var express = require('express');
var router = express.Router();
const uuid = require('uuid/v4');
const shortid = require('shortid');
var helper = require('./helper');
var db = require('./../config/db');
var config = require('./../config/config');
var constants = require('../constants/constants');

var web3Conf = true;

if (web3Conf) {
	var init = require('../web3Helpers/init.js');
	var landRecords = require('../web3Helpers/landRecords.js');
	var landRegistry = require('../web3Helpers/landRegistry.js');
}

router.get('/getFinancers', async function(req, res) {
	console.log('getFinancers : start');
    helper.getRecords('a',{'role' : 'bank'}, function(err, data) { //change first parameter
        if (err) {
			// return res.send({status : false, msg : err});
			let error = helper.getErrorResponse('DBError');
			return res.status(error.statusCode).send(error.error);
        }
        return res.send({status : true, data : data});
    });																																																																																																																								
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
			}
			console.log("query", query);
	        let p = await collection.find(query).sort({'created' : -1}).toArray();
	        console.log(p);
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
		console.log("query", query);
        let q = await collection.find(query).sort({_id : -1}).toArray();
        console.log(q)
        records = records.concat(q);
	    records.sort(function(x, y){
	        return y.created - x.created;
	    });   
		return res.send({status : true, data : records});
	} catch(err) {
		console.log(err);
        let error = helper.getErrorResponse('DBError');
		return res.status(error.statusCode).send(error.error);
    }
});

router.post('/signup', function(req, res) {
	//check user exists
	console.log('signup : start')
	let userDetails = req.body.userDetails;
	if (web3Conf) {
		//create a new address => personal.newAccount()
		userDetails.address = init.createAccount('123');
		console.log('address', userDetails.address);
		userDetails.passPhrase = '123';
	} else {
		userDetails.address = "0x0638e1574728b6d862dd5d3a3e0942c3be47d996";
		userDetails.passPhrase = '123';
	}
	console.log('userDetails', userDetails)
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
		// return res.send({status : false, error : "Invalid Email/Password"});
		let error = helper.getErrorResponse('MissingParameter');
		return res.status(error.statusCode).send(error.error);
	}
	helper.getUserDetails({email : email, password : password}, function(err, data) {
	    if (err) {
			console.log('login: error:', err);
			let error = helper.getErrorResponse('IncorrectEmailOrPassword');
			return res.status(error.statusCode).send(error.error);
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

// router.get('/getPropertyDetails', function(req, res) {
// 	console.log('getPropertyDetails : start')
// 	let propertyId = req.params.propertyId || req.query.propertyId;
// 	console.log('propertyId', propertyId)
// 	var responseData = {};

// 	helper.getRecord('properties', {propertyId : propertyId}, function(err, data) {
// 	    if (err) {
// 	        return res.send({status : false, error : err});
// 	    }
// 	    console.log(err, data);
// 	    var propertyDetails = data;
// 	    var status = data.status;
// 	    var owner = data.owner;
// 	    responseData.property = propertyDetails;
// 	    var statusNo = helper.propertyStatusMap[status];
// 	    if (statusNo < 5) {
// 			helper.getUserDetails({email : owner}, function(err, data) {
// 			    if (err) {
// 			        return res.send({status : false, error : err});
// 			    }
// 			    responseData.owner = data;
// 			    return res.send({status : true, data : responseData});
// 			});
// 	    } else {
// 	    	var registryId = propertyDetails.registryId;
// 			helper.getRecord('registry', {registryId : registryId}, function(err, data) {
// 			    if (err) {
// 			        return res.send({status : false, error : err});
// 			    }
// 			    return res.send({status : true, data : data});
// 			});
// 	    }
// 	});
// });


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
		console.log('propertyId', propertyId);
	}
	var collection = db.getCollection('properties');
    let propertyDetails = await collection.findOne({propertyId : propertyId});
    let userList = [];
    if (!allData) {
		userList.push(propertyDetails.owner.email);
    } else {
    	if (allData.owner && allData.owner.email) {
			console.log(userList);
    		userList.push(allData.owner.email);
    	}
    	if (allData.ownerFinancer && allData.ownerFinancer.email) {
			console.log(userList);
    		userList.push(allData.ownerFinancer.email);
    	}
    	if (allData.buyer && allData.buyer.email) {
			console.log(userList);
    		userList.push(allData.buyer.email);
    	}
    	if (allData.buyerFinancer && allData.buyerFinancer.email) {
			console.log(userList);
    		userList.push(allData.buyerFinancer.email);
    	}
    }

	var collection = db.getCollection('users');
    let userDetails = await collection.find({email : {$in : userList}}).toArray();
    console.log('userDetails', userDetails)
    userDetails = helper.arrayToObject(userDetails, "email");

    let responseData = {};
    if (!allData) {
    	responseData.propertyId = propertyId;
    	responseData.propertyDetails = propertyDetails;
    	responseData.owner = {};
    	responseData.owner.userDetails = userDetails[propertyDetails.owner];
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
			return res.send({status : false, error : err});
		}
	} else {
		data = constants.dummyExplorerData;
	}
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
	        console.log(err);
	    }
	}
	console.log('property', propertyDetails);
	helper.insertCollection('properties', propertyDetails, function(err, data) {
	    if (err) {
			console.log('error:', err, 'data:',data);
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
	        console.log('propertyId', propertyId);
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
			console.log('error:', err, 'data:',data);
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
		console.log(e)
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
	   	let stampDuty = (sellPrice * 5)/100 + 2000;
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
		console.log(query);
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
	let query = {registryId : registryId};
	let updateQuery = {
		$set : {
			owner : ownerDetails,
			status : 'registry_owner',
			modified : Date.now()
		}
	};
	if (web3Conf) {
		try {
	        m = await landRegistry.setStatus(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            helper.web3StringToBytes32("registry_owner")
	        );
		} catch(e) {
			console.log(e);
			return res.send({status : false, error : e});
		}
	}

	helper.updateCollection('registry', query, updateQuery,
		function(err, data) {
	    if (err) {
			console.log('error:', err, 'data:',data);
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	        // return res.send({status : false, error : err});
	    }
	    return res.send({status : true});
	});
});

router.post('/addOwnerFinancer', async function(req, res) {
	console.log('addOwnerFinancer : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let ownerFinancer  = req.body.ownerFinancer || false;
	let status = req.body.status || (
		!ownerFinancer ?
		"registry_skip_owner_financer" : "registry_owner_financer"
	);
	if (web3Conf && status == 'registry_owner_financer') {
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
			return res.send({status : false, error : e});
		}
	}

	let query = {registryId : registryId};
	let updateQuery = {$set : {
		ownerFinancer : ownerFinancer,
		status : status,
		modified : Date.now()
	}};
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

router.post('/confirmFinancer', async function(req, res) {
	console.log('confirmFinancer : start');
	let registryId = req.body.registryId;
	let propertyId = req.body.propertyId;
	let currentStatus= req.body.currentStatus;
	let approved = req.body.approved;
	let status = false;
	switch(currentStatus) {
		case 'registry_owner_financer' :
			status = (approved ? "registry_owner_financer_verified" :
			"registry_owner_financer_rejected");
		case 'registry_buyer_financer' :
			status = (approved ? "registry_buyer_financer_verified" :
			"registry_buyer_financer_rejected");
	}
	if (!status) {
		return {status : false, error : 'Invalid request'};
	}

	if (web3Conf) {
		try {
	       m = await landRegistry.setStatus(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            helper.web3StringToBytes32(status)
	        );
	       console.log("setStatus", setStatus);
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
	        console.log('error:', err, 'data:',data);
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
		        buyerDetails.address
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
	        console.log('error:', err, 'data:',data);
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
	        console.log('error:', err, 'data:',data);
			let error = helper.getErrorResponse('DbError');
			return res.status(error.statusCode).send(error.error);
	    }
	    return res.send({status : true});
	});
});

router.post('/addBuyerFinancer', async function(req, res) {
	console.log('addBuyerFinancer : start');
	let registryId = req.body.registryId;
	let buyerFinancer  = req.body.buyerFinancer || false;
	let status = req.body.status || (
		!buyerFinancer ?
		"registry_skip_buyer_financer" : "registry_buyer_financer"
	);

    if (web3Conf && status == 'registry_buyer_financer') {
		try {
	        m = await landRegistry.addBuyerFinancer(
	            helper.web3StringToBytes32(registryId),
	            helper.web3StringToBytes32(propertyId),
	            buyerFinancer.address,
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
	        console.log('error:', err, 'data:',data);
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
	console.log('registryData', registryData)
	let tokenAmt = registryData.tokenAmt || 0;
	//transfer amount from buyer to owner
	let paymentRemaining = registryData.paymentRemaining || 0;
	paymentRemaining -= tokenAmt;

	let updateQuery = {$set : {
		paymentRemaining : paymentRemaining,
		status : "registry_token_amount",
		modified : Date.now()
	}};
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
	let financeAmount = registryData.buyerFinancer.financeAmount;
	let outstandingLoan = (!registryData.ownerFinancer) ? 0 :
		registryData.ownerFinancer.outstandingLoan;
	let paymentRemaining = registryData.paymentRemaining || 0;
	//if (buyerFinancer.balance < financeAmount) => return("insufficient balance");
	if (financeAmount > outstandingLoan) {
		//transfer(buyerFinancer, ownerFinancer, outstandingLoan)
		paymentRemaining -= outstandingLoan;
		let fAmt = financeAmount - outstandingLoan;
		outstandingLoan = 0;
		//transfer(buyerFinancer, owner, fAmt)
		paymentRemaining -= fAmt;
	} else {
		//transfer(buyerFinancer, ownerFinancer, financeAmount)
		paymentRemaining -= financeAmount;
		outstandingLoan -= financeAmount;
	}

	let updateQuery = {$set : {
		paymentRemaining : paymentRemaining,
		"ownerFinancer.outstandingLoan" : outstandingLoan,
		status : "registry_buyer_pay",
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

	//if (buyer.getBalance() < paymentRemaining) => return("insufficientBalance");
	if (outstandingLoan > 0) {
		//transfer(buyer, ownerFinancer, outstandingLoan)
		paymentRemaining -= outstandingLoan;
		outstandingLoan = 0;
	}
	//transfer(buyer, owner, paymentRemaining)
	paymentRemaining = 0;

	let updateQuery = {$set : {
		paymentRemaining : paymentRemaining,
		"buyerFinancer.outstandingLoan" : outstandingLoan,
		status : "registry_buyer_pay",
		modified : Date.now()
	}};
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

router.post('/payStampDuty', async function(req, res) {
	console.log('payStampDuty : start');
	let registryId = req.body.registryId;
	let query = {registryId : registryId};
	//return if no balance
	let updateQuery = {$set : {
		stampDutyRemaining : 0,
		status : "registry_stamp_duty",
		modified : Date.now()
	}};
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

router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;