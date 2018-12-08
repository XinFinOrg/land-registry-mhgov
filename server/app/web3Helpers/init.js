const Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var provider = new Web3.providers.HttpProvider(process.env.RPC);
    web3 = new Web3(provider);
}
var provider = new Web3.providers.HttpProvider(process.env.RPC);

if (web3 && web3.isConnected()) {
    console.log('web3 is Connected')
} else {
    console.log('web3 is not Connected')
}

var unlockSync = function(address, phrase) {
    return web3.personal.unlockAccount(address, phrase, 15);
};

var unlockCoinbase = function() {
    return web3.personal.unlockAccount(web3.eth.coinbase, "", 1000000);
};

var createAccount = function(phrase) {
    return web3.personal.newAccount('phrase');
}

module.exports = {
	web3 : web3,
	createAccount : createAccount,
	unlockCoinbase : unlockCoinbase,
	unlockSync : unlockSync
};