var express = require('express');
var router = express.Router();
const uuid = require('uuid/v4');

var helper = require('./helper');
var db = require('./../config/db');
var config = require('./../config/config');
var constants = require('../constants/constants')
var web3Conf = false;
if (web3Conf) {
	var gpa = require('../web3Helpers/gpa');	
}

router.post('/confirmIssuePolicy', helper.requestAuth, function(req, res) {
	let policyNo = req.body.policyNo;
	var updateQuery = {$set : {policyState : 'ISSUED'}};
	helper.updatePolicy({policyNo : policyNo}, updateQuery, async function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    //set policy status to blockchain
	    if (web3Conf) {
	    	try {
				var m = await gpa.setStatus(
				    helper.web3StringToBytes32(policyInfo.policyNo),
				    helper.web3StringToBytes32(policyInfo.policyState)
				);
		    } catch(err) {
				console.log('error', err);
				return res.send({status : false, error : err});
			}
	    }
	    return res.send({status : true});
	});
});

router.get('/getPolicies', async function(req, res) {
	const SKIP = parseInt((req.params.skip) || (req.query.skip));
	const LIMIT = parseInt((req.params.limit) || (req.query.limit));
	console.log('SKIP', SKIP, 'LIMIT', LIMIT)
    var collection = db.getCollection('policys');
    try {
        let data = await collection.find({}).skip(SKIP).limit(LIMIT).toArray();
		//console.log('data',data);
		return res.send({status : true, data : data});
	} catch(err) {	
        return res.send({status : false, error : err});
    }
});

router.get('/getTotalPoliciesCount', async function(req, res){
	var collection = db.getCollection('policys');
    try {
        let count = await collection.count({});
		// console.log('data',data);
		return res.send({status : true, count : count});
	} catch(err) {
        return res.send({status : false, error : err});
    }
});

router.get('/getPolicyDetails', async function(req, res) {
	let policyNo = (req.param.policyNo) || req.query.policyNo;
    helper.getPolicyDetails({'policyNo' : policyNo}, async function(err, data) {
        if (err) {
            return res.send({status : false, msg : data});
        }
        return res.send({status : true, data : data});
    });																																																																																																																								
});

/*router.get('/getExplorer', async function(req, res) {
	let policyNo = (req.param.policyNo) || req.query.policyNo;
	let data;
	if (web3Conf) {
	    try {
			data = await gpa.getAllEvents(policyNo);
	    } catch(err) {
			console.log('error', err);
			return res.send({status : false, error : err});
		}
	} else {
		data = constants.dummyData;
	}
    return res.send({status : true, data : data});
});*/

router.post('/getDashboard', function(req, res) {
	console.log('getUsers : start')
	let email = req.body.email;
	let role = req.body.role;
	let query = {};
	if (role == 'individual') {
		query = {$or : [{owner : email}, {buyer : email}]}
	} else if (role == 'bank') {
		query = {$or : [{ownerFinancer : email}, {buyerFinancer : email}]};
	}
	helper.getRecords('properties', query, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true, data : data});
	});
});

router.post('/signup', function(req, res) {
	console.log('signup : start')
	let userDetails = req.body.userDetails;
	console.log('userDetails', userDetails)
	helper.addUser(userDetails, async function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true});
	});
});

router.post('/login', function(req, res) {
	console.log('login : start')
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
        return res.send({status : false, error : "Invalid Email/Password"});
	}
	helper.getUserDetails({email : email, password : password}, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true, data : data});
	});
});

router.get('/getUserDetails', function(req, res) {
	console.log('getUserDetails : start')
	let email = req.params.email || req.query.email;
	helper.getUserDetails({email : email}, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true, data : data});
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

router.post('/addProperty', function(req, res) {
	console.log('addPorperty : start');
	let propertyDetails = req.body.propertyDetails;
	propertyDetails.propertyId = uuid();
	// ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'
	propertyDetails.status = 'new';
	helper.insertCollection('properties', propertyDetails, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true, data : propertyDetails});
	});
});

router.post('/confirmProperty', function(req, res) {
	console.log('confirmPorperty : start');
	let propertyId = req.body.propertyId;
	let status = req.body.status; //new, verified, rejected
	let query = {propertyId : propertyId};
	let updateQuery = {$set : {status : status}};
	helper.updateCollection('properties', query,
		updateQuery, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
	    return res.send({status : true});
	});
});

router.post('/sellProperty', function(req, res) {
	let propertyId = req.body.propertyId;
	let email = req.body.owner;
	let registryId = uuid();
	let query = {propertyId : propertyId};
	let updateQuery = {
		onSell : 'active',
		status : "on_sell",
		registryId : registryId
	};

	helper.updateCollection('properties', query,
		updateQuery, function(err, data) {
	    if (err) {
	        return res.send({status : false, error : err});
	    }
		query = {
			registryId : registryId,
			propertyId : propertyId,
			owner : {
				email : email
			},
			status : "new"
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

router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;