const db = require('./../config/db');
const errorCodes = require('../constants/errorCodes');
var ethers = require('ethers');

let getErrorResponse = function(errorKey) {
    var errorXX = errorCodes.getErrorCodes(errorKey);
    var statusCode = errorXX.statusCode;
    delete errorXX.statusCode;
    errorXX.status = false;
    return {statusCode : statusCode, error : errorXX};
};

let getUsers = function(query, cb) {
    var collection = db.getCollection('users');
    collection.find(query).toArray(function(err, data) {
        console.log('query', query);
        if (err) {
            return cb(true, err);
        }
        return cb(false, data);
    });
};

let getUserDetails = function(query, cb) {
    console.log('query', query)
    var collection = db.getCollection('users');
    collection.find(query).toArray(function(err, data) {
        if (err || !data.length) {
            return cb(true, err);
        }
        return cb(false, data[0]);
    });
};

let requestAuth = function(req, res, next) {
    console.log("start : requestAuth");
    var api_key = req.body.API_KEY;
    var api_secret = req.body.API_SECRET;
    if (false) {
        var errObj = getErrorResponse('AuthenticationFailed');
        return res.status(errObj.statusCode).send(errObj.error);
    }
    return next();
}

let validatePolicyDetails = function(req, res, next) {
    console.log("start : validatePolicyDetails");
    var policy = req.body.policyDetails;
    if (false) {
        var errObj = getErrorResponse('AuthenticationFailed');
        return res.status(errObj.statusCode).send(errObj.error);
    }
    return next();
};

let debitRequest = function(req, res, next) {
    console.log("start : debitRequest");
    if (!req.body) {
        req.body = {};
    }
    req.body.policyState = 'DEBIT_SUCCESS';
    return next();
};

let isPolicyExist = async function(req, res, next) {
    var policyNo = req.body.policyNo;
    var collection = db.getCollection('policys');
    try {
        let policyCount = await collection.count({policyNo : policyNo});
        if (policyCount) {
            return res.send({status : false, error : "policy already exist"});
        }
        return next();
    } catch(err) {
        return res.send({status : false, error : err});
    }
};

let issuePolicy = function(req, res, next) {
    console.log("start : issuePolicy");
    if (req.body && (req.body.policyState == 'DEBIT_FAILED')) {
        return next();
    }
    //ISSUE_POLICY_REQUEST
    //ISSUE_POLICY_FAILED
    req.body.policyState == 'ISSUE_POLICY_SUCCESS';
    return next();
}

let updatePolicy = function(query, update, cb) {
    var collection = db.getCollection('policys');
    collection.update(query, update, function(err, data) {
        if (err) {
            return cb(true, err);
        }
        return cb(false, data);
    });
};

let savePolicy = function(input, cb) {
    console.log('start : savePolicy');
    var collection = db.getCollection('policys');
    collection.save(input, function(err, data) {
        if (err) {
            return cb(true, err);
        }
        return cb(false, data);
    });
};

let addUser = function(input, cb) {
    console.log('start : addUser');
    var collection = db.getCollection('users');
    collection.save(input, function(err, data) {
        if (err) {
            return cb(true, err);
        }
        return cb(false, data);
    });
};

let debitStatusHelper = function(req, res, next) {
    console.log("start : debitStatusHelper");
    var policyNo =  req.body.policyNo;
    var debitStatus =   req.body.debitStatus;
    req.body.policyState = debitStatus;
    getPolicyDetails({policyNo : policyNo}, function(err, data) {
        if (err) {
            return res.send({status : false});
        }
        if (!data.length) {
            return res.send({status : false, error : 'Policy does not exist'});
        }
        req.body.policyInfo = data[0];
        //logic to check policy state
        return next();
    });
};

let issuePolicyHelper = function(req, res, next) {
    var policyNo =  req.body.policyNo;
    getPolicyDetails({policyNo : policyNo}, function(err, data) {
        if (err) {
            return res.send({status : false});
        }
        return next();
    });
};

let web3StringToBytes32_1 = (text) => {
    var result = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(text));
    while (result.length < 66) { result += '0'; }
    if (result.length !== 66) { throw new Error("invalid web3 implicit bytes32"); }
    return result;
};

let web3StringToBytes32 = (text) => {
    var data = ethers.utils.toUtf8Bytes(text);
    if (data.length > 32) { throw new Error('too long'); }
    data = ethers.utils.padZeros(data, 32);
    return ethers.utils.hexlify(data);
};

let bytesToStr = (text) => {
    text = text.replace(/0x0+/, '0x');
    return ethers.utils.toUtf8String(text);
};

let hexToStr = str => {
    str = str.replace(/^0x0+/, '');
    return new Buffer(str, 'hex').toString('utf8');
}

let isHex = str => /^0x[0-9A-Fa-f]+$/.test(str);
/*var x = '0x0000000000000000000000000000000000000000000000000000000031393839';
console.log(typeof x == 'string', x.length, isHex(x), hexToStr(x), bytesToStr(x))*/

let processEventBigNumbers = (allEvents) => {
    var event, obj, str;
    for (var i in allEvents) {
        event = allEvents[i];
        obj = event.args;
        for(var key in obj) {
            if (typeof obj[key] == 'string') {
                //process hex strings
                str = obj[key];
                if (str.length == 66 && isHex(str)) {
                    obj[key] = bytesToStr(str);
                }
            } else if(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object') {
                //process bignumbers
                obj[key] = obj[key].toNumber();
            }
        }
    }
    return allEvents;
};

let addPolicyMiddlewares = [requestAuth, validatePolicyDetails, isPolicyExist, debitRequest, issuePolicy];
let debitStatusMiddlewares = [requestAuth, debitStatusHelper, issuePolicy];
let issuePolicyMiddlewares = [requestAuth, issuePolicyHelper, issuePolicy];

module.exports = {
    getErrorResponse : getErrorResponse,
    requestAuth : requestAuth,
    validatePolicyDetails : validatePolicyDetails,
    debitRequest : debitRequest,
    issuePolicy : issuePolicy,
    savePolicy : savePolicy,
    updatePolicy : updatePolicy,
    addPolicyMiddlewares : addPolicyMiddlewares,
    debitStatusHelper : debitStatusHelper,
    debitStatusMiddlewares : debitStatusMiddlewares,
    issuePolicyHelper : issuePolicyHelper,
    issuePolicyMiddlewares : issuePolicyMiddlewares,
    web3StringToBytes32 : web3StringToBytes32,
    bytesToStr : bytesToStr,
    processEventBigNumbers : processEventBigNumbers,
    getUserDetails : getUserDetails,
    addUser : addUser,
    getUsers : getUsers
};