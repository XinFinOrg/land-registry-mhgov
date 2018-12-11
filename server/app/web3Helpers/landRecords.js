const contract = require('truffle-contract');
const Web3 = require('web3');
var Promise = require('promise');
var contractJson = require('../../deployer/build/contracts/LandRecordContract.json');

var init = require('./init.js')
var helper = require('../routes/helper');
web3 = init.web3;
/*var config = require('../../config/config');
var contractOwner = config.contractOwner;*/
var getInstance = function(data) {
    const mycontract = web3.eth.contract(data.abi);
    return mycontract.at(data.networks[web3.version.network].address);
}

var contractInstance = getInstance(contractJson);

var addProperty = async function(
    propertyId,
    surveyNo,
    landType,
    area,
    openParking,
    coveredParking,
    floorNo,
    owner,
    status,
    created = Date.now()
) {
    return await contractInstance.addProperty(
        propertyId,
        surveyNo,
        landType,
        area,
        openParking,
        coveredParking,
        floorNo,
        owner,
        created,
        status,
        {from: web3.eth.coinbase, gas:1000000}
    );
};

var setStatus = async function(
    propertyId,
    status,
    created = Date.now()
) {
    console.log(propertyId, status, created)
    return await contractInstance.setStatus(
        propertyId,
        status,
        created,
        {from: web3.eth.coinbase, gas:1000000}
    );
};

var addOwner = async function(
    propertyId,
    owner,
    created = Date.now()
) {
    return await contractInstance.addOwner(
        propertyId,
        owner,
        created,
        {from: web3.eth.coinbase, gas:1000000}
    );
};

var allEvents = function() {
    contractInstance.allEvents({}).get((e, res) => console.log('allEvents', JSON.stringify(res, null, 4)));
}

const Promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

var getAllEvents = async function(propertyId) {
    let eventInstance, events;
    let allEvents = []; 
    //let f0 = {policyNo : helper.web3StringToBytes32(policyNo)};
    let f1 = {
            from: web3.eth.coinbase,
            gas: 70000000
        };
    let f2 = {
            fromBlock: 0,
            toBlock: 'latest'
        };

    eventInstance = contractInstance.AddProperty(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.SetStatus(f1, f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.AddOwner(f1, f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    allEvents = allEvents.filter(tx => tx.args && helper.bytesToStr(tx.args.propertyId) == propertyId);
    //handle bignumbers
    allEvents = helper.processEventBigNumbers(allEvents);
    allEvents = helper.processEvents(allEvents);

    //sort events by timeline
    /*allEvents.sort(function(x, y){
        return x.args.created - y.args.created;
    })*/
    return allEvents;
};

module.exports = {
    addProperty : addProperty,
    addOwner : addOwner,
    setStatus : setStatus,
    getAllEvents : getAllEvents
};