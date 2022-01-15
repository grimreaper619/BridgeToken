const BridgeBSC = artifacts.require('./BridgeBsc.sol');
const BridgeToken = artifacts.require('./BridgeToken.sol');
const privKey = 'priv key of sender';

module.exports = async done => {
  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeBsc = await BridgeBSC.deployed();
  const token = await BridgeToken.deployed();
  const amount = 1000;
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  await token.approve(bridgeBsc.address);
  await bridgeBsc.deposit(accounts[0], amount, nonce, signature);
  nonce++;
  done();
}
