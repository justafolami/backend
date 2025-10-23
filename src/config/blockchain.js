const { ethers } = require("ethers");
const { distributorABI, tokenABI } = require("./web3");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const tokenContract = new ethers.Contract(
  process.env.TOKEN_ADDRESS,
  tokenABI,
  wallet
);

const rewardContract = new ethers.Contract(
  process.env.REWARD_ADDRESS,
  distributorABI,
  wallet
);

module.exports = { provider, wallet, tokenContract, rewardContract };
