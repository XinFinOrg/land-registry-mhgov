var landRecord = artifacts.require("./LandRecordContract.sol");
var LandRegistry = artifacts.require("./LandRegistry.sol");

module.exports = function(deployer) {
	deployer.deploy(landRecord);
	deployer.deploy(LandRegistry);
};