const BitDelta = artifacts.require("./BitDelta");
require("dotenv").config();
const Web3 = require("web3").default;
const web3 = new Web3();
const addresses = [
  process.env.Circulating_Supply,
  process.env.Users_Onboarding_And_Staking_Rewards,
  process.env.Marketing,
  process.env.Reasearch_And_Development,
  process.env.Team,
  process.env.Platform_Governance
];
const checksumAddresses = addresses.map((address) =>
  web3.utils.toChecksumAddress(address)
);

console.log(checksumAddresses); // Output will be the correct checksummed addresses

module.exports = async function (deployer) {
  await deployer.deploy(BitDelta, checksumAddresses);

  await BitDelta.deployed();
};
