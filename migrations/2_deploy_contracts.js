const Token = artifacts.require("Token");

const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  // Deploy Token contract
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // Deploy EthSwap contract
  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  // Transfer token balance to ethSwap contract
  await token.transfer(ethSwap.address, '1000000000000000000000000');
};
