const contract = require('truffle-contract');
const Web3 = require('web3');
var Promise = require('promise');
var contractJson = require('../../deployer/build/contracts/LandRegistry.json');
var init = require('./init.js');
var helper = require('../routes/helper');
web3 = init.web3;
var testrpc = process.env.TESTRPC;

/*var config = require('../../config/config');
var contractOwner = config.contractOwner;*/
var getInstance = function(data) {
    const mycontract = web3.eth.contract(data.abi);
    return mycontract.at(data.networks[web3.version.network].address);
}

var contractInstance = getInstance(contractJson);

var addRegistryRecord = async function(
    registryId,
    propertyId,
    owner,
    sellPrice,
    tokenAmount,
    created = Date.now()
) {
    return await contractInstance.addRegistryRecord(
        registryId,
        propertyId,
        owner,
        sellPrice,
        tokenAmount,
        created,
        {from: web3.eth.coinbase, gas:1000000}
    );
};

var addBuyer = async function(
    registryId,
    propertyId,
    buyer,
    created = Date.now()
) {
    return await contractInstance.addBuyer(
        registryId,
        propertyId,
        buyer,
        created,
        {from: web3.eth.coinbase, gas:1000000}
    );
};

var addOwnerFinancer = async function(
    registryId,
    propertyId,
    ownersFinancer,
    loanAmount,
    outstandingLoan,
    created = Date.now()
) {
    return await contractInstance.addOwnerFinancer(
        registryId,
        propertyId,
        ownersFinancer,
        loanAmount,
        outstandingLoan,
        created,
        {from: web3.eth.coinbase, gas:1000000}
    );
};

var addBuyerFinancer = async function(
    registryId,
    propertyId,
    buyersFinancer,
    buyerFinanceAmount,
    created = Date.now()
) {
    return await contractInstance.addBuyerFinancer(
        registryId,
        propertyId,
        buyersFinancer,
        buyerFinanceAmount,
        created,
        {from: web3.eth.coinbase, gas:100000}
    );
};

var setRegistrationFees = async function(
    registryId,
    propertyId,
    registartionCharges,
    created = Date.now()
) {
    return await contractInstance.setRegistrationFees(
        registryId,
        propertyId,
        registartionCharges,
        created,
        {from: web3.eth.coinbase, gas:100000}
    );
};

var setStatus = async function(
    registryId,
    propertyId,
    status,
    created = Date.now()
) {
    return await contractInstance.setStatus(
        registryId,
        propertyId,
        status,
        created,
        {from: web3.eth.coinbase, gas:100000}
    );
};

var customTransferEvent = async function(
    registryId,
    propertyId,
    type,
    from,
    to,
    amount,
    created = Date.now()
) {
    return await contractInstance.TransferTokens(
        registryId,
        propertyId,
        type,
        from,
        to,
        amount,
        created,
        {from: web3.eth.coinbase, gas:100000}
    );
};

//wallet related apis
var getBalance = async function(address) {
    return await contractInstance.getBalance.call(address);
};

var getTotalSupply = async function() {
    return await contractInstance.getTotalSupply.call();
};

var setTotalSupply = async function(tokens) {
    return await contractInstance.setTotalSupply(tokens, {from: web3.eth.coinbase, gas:100000});
};

var addTokenSupply = async function(tokens) {
    return await contractInstance.addTokenSupply(tokens, {from: web3.eth.coinbase, gas:100000});
};

var buyTokens = async function(to, tokens) {
    return await contractInstance.transfer(to, tokens, {from: web3.eth.coinbase, gas:1000000});
};

var sendTokens  = async function(_from, _to, tokens) {
    if (!testrpc) {
        var unlock = init.unlockSync(_from, "123");        
        console.log("unlock", unlock);
    }
    return await contractInstance.transfer(_to, tokens, {from: _from, gas:1000000});
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

var getAllEvents = async function(registryId) {
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

    eventInstance = contractInstance.AddRegistryRecord(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.AddBuyer(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.AddOwnerFinancer(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.AddBuyerFinancer(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.SetRegistrationFees(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.TransferTokens(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);

    eventInstance = contractInstance.SetStatus(f1,  f2);
    events = await (Promisify(cb => eventInstance.get(cb)));
    allEvents = allEvents.concat(events);
    allEvents = allEvents.filter(tx => tx.args && helper.bytesToStr(tx.args.registryId) == registryId);
    //handle bignumbers
    allEvents = helper.processEventBigNumbers(allEvents);
    //sort events by timeline
    /*allEvents.sort(function(x, y){
        return x.args.created - y.args.created;
    })*/
    return allEvents;
};

module.exports = {
	addRegistryRecord : addRegistryRecord,
	addBuyer : addBuyer,
	addOwnerFinancer : addOwnerFinancer,
	addBuyerFinancer : addBuyerFinancer,
	setRegistrationFees : setRegistrationFees,
	setStatus : setStatus,
	getBalance : getBalance,
	getTotalSupply : getTotalSupply,
	setTotalSupply : setTotalSupply,
	addTokenSupply : addTokenSupply,
	buyTokens : buyTokens,
	sendTokens : sendTokens,
    customTransferEvent : customTransferEvent,
	getAllEvents : getAllEvents
};