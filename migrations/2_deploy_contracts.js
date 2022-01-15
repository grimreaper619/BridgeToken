const TokenMatic = artifacts.require('BridgeToken.sol');
const TokenBsc = artifacts.require('BridgeToken.sol');
const BridgeMatic = artifacts.require('BridgeMatic.sol');
const BridgeBsc = artifacts.require('BridgeBsc.sol');

module.exports = async function (deployer, network, addresses) {
  if(network === 'matictestnet') {
    await deployer.deploy(TokenMatic);
    const tokenMatic = await TokenMatic.deployed();
    await deployer.deploy(BridgeMatic, tokenMatic.address);
    const bridge = await BridgeMatic.deployed();
    await tokenMatic.transfer(bridge.address,1e12);
  }
  if(network === 'bsctestnet') {
    await deployer.deploy(TokenBsc);
    const tokenBsc = await TokenBsc.deployed();
    await deployer.deploy(BridgeBsc, tokenBsc.address);
    const bridge = await BridgeBsc.deployed();
    await tokenBsc.transfer(bridge.address,1e12);
  }
};
