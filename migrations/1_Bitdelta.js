const BitDelta = artifacts.require("./BitDelta");
require("dotenv").config();
const Web3 = require("web3").default;
const web3 = new Web3();
const addresses = [
  process.env.KOL_Branding,
  process.env.Platform_Governance,
  process.env.Team_Incentive,
  process.env.Referral_And_Airdrop,
  process.env.Ecosystem,
  process.env.Project_Advisory_Panel,
  process.env.Staking,
  process.env.Founders_And_Affiliates,
  process.env.Strategy,
  process.env.Treasury_And_Platform,
  process.env.Private_Sale_1,
  process.env.Private_Sale_2,
  process.env.Public_Sale,
];
const checksumAddresses = addresses.map((address) =>
  web3.utils.toChecksumAddress(address)
);

console.log(checksumAddresses); // Output will be the correct checksummed addresses

module.exports = async function (deployer) {
  await deployer.deploy(BitDelta, checksumAddresses);

  await BitDelta.deployed();
};
