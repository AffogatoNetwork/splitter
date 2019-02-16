var SplitterFactory = artifacts.require("./SplitterFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SplitterFactory);
};
