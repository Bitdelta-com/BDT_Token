const BitDelta = artifacts.require("./BitDelta.sol");
const chalk = require("chalk");
const log = console.log;
const decimals = 1e18;

contract("BitDelta", (accounts) => {
  let KOL_Branding_Balance = 240_000_000 * decimals;
  let Platform_Governance_Balance = 360_000_000 * decimals;
  let Team_Incentive_Balance = 240_000_000 * decimals;
  let Referral_And_Airdrop_Balance = 240_000_000 * decimals;
  let Ecosystem_Balance = 240_000_000 * decimals;
  let Project_Advisory_Panel_Balance = 120_000_000 * decimals;
  let Staking_Balance = 120_000_000 * decimals;
  let Founders_And_Affiliates_Balance = 120_000_000 * decimals;
  let Strategy_Balance = 120_000_000 * decimals;
  let Treasury_And_Platform_Balance=120_000_000*decimals;
  let Private_Sale_1_Balance = 159_840_000 * decimals;
  let Private_Sale_2_Balance = 159_840_000 * decimals;
  let Public_Sale_Balance = 160_320_000 * decimals;

  // fetch accounts on different index
  let [
    OWNER,
    KOL_Branding,
    Platform_Governance,
    Team_Incentive,
    Referral_And_Airdrop,
    Ecosystem,
    Project_Advisory_Panel,
    Staking,
    Founders_And_Affiliates,
    Strategy,
    Treasury_And_Platform,
    Private_Sale_1,
    Private_Sale_2,
    Public_Sale,
  ] = accounts;
  let BitDeltaContract;

  beforeEach(async () => {
    log(`
        Contract deployed by ${chalk.yellow.bold("OWNER")}(${chalk.green(
      OWNER
    )})          
        ${chalk.yellow.bold("KOL_Branding")} Address:-${chalk.green(KOL_Branding)}             
        ${chalk.yellow.bold("Platform_Governance")} Address:-${chalk.green(
          Platform_Governance
    )}           
        ${chalk.yellow.bold("Team_Incentive")} Address:-${chalk.green(Team_Incentive)}
        ${chalk.yellow.bold("Referral_And_Airdrop")} Address:-${chalk.green(
          Referral_And_Airdrop
    )}
        ${chalk.yellow.bold("Ecosystem")} Address:-${chalk.green(Ecosystem)}
        ${chalk.yellow.bold("Project_Advisory_Panel")} Address:-${chalk.green(
          Project_Advisory_Panel
    )}
        ${chalk.yellow.bold("Staking")} Address:-${chalk.green(Staking)}
        ${chalk.yellow.bold("Founders_And_Affiliates")} Address:-${chalk.green(Founders_And_Affiliates)}
        ${chalk.yellow.bold("Staking")} Address:-${chalk.green(Strategy)}
        ${chalk.yellow.bold("Founders_And_Affiliates")} Address:-${chalk.green(Private_Sale_1)}
        ${chalk.yellow.bold("Staking")} Address:-${chalk.green(Private_Sale_2)}
        ${chalk.yellow.bold("Founders_And_Affiliates")} Address:-${chalk.green(Public_Sale)}
    `);

    BitDeltaContract = await BitDelta.new(
      [KOL_Branding,
      Platform_Governance,
      Team_Incentive,
      Referral_And_Airdrop,
      Ecosystem,
      Project_Advisory_Panel,
      Staking,
      Founders_And_Affiliates,
      Strategy,
      Treasury_And_Platform,
      Private_Sale_1,
      Private_Sale_2,
      Public_Sale]
    );
  });


  it("Checking balances for all--", async () => {
    let kOL_BrandingMinted = await checkBalance(KOL_Branding);
    assert.equal(
      kOL_BrandingMinted,
      KOL_Branding_Balance,
      `KOL_Branding Balance must be equal to ${setDecimals(KOL_Branding_Balance)}`
    );
  

    let platform_GovernanceMinted = await checkBalance(Platform_Governance);
    assert.equal(
      platform_GovernanceMinted,
      Platform_Governance_Balance,
      `Platform_Governance Balance must be equal to ${setDecimals(Platform_Governance_Balance)}`
    );

    let team_IncentiveMinted = await checkBalance(Team_Incentive);
    assert.equal(
      team_IncentiveMinted,
      Team_Incentive_Balance,
      `Team_Incentive Balance must be equal to ${setDecimals(Team_Incentive_Balance)}`
    );

    let referral_And_AirdropMinted = await checkBalance(Referral_And_Airdrop);
    assert.equal(
      referral_And_AirdropMinted,
      Referral_And_Airdrop_Balance,
      `Referral_And_Airdrop Balance must be equal to ${setDecimals(
        Referral_And_Airdrop_Balance
      )}`
    );

    let ecosystemMinted = await checkBalance(Ecosystem);
    assert.equal(
      ecosystemMinted,
      Ecosystem_Balance,
      `Ecosystem Balance must be equal to ${setDecimals(Ecosystem_Balance)}`
    );

    let project_Advisory_PanelMinted = await checkBalance(Project_Advisory_Panel);
    assert.equal(
      project_Advisory_PanelMinted,
      Project_Advisory_Panel_Balance,
      `Project_Advisory_Panel Balance must be equal to ${setDecimals(
        Project_Advisory_Panel_Balance
      )}`
    );

    let stakingBalanceMinted = await checkBalance(Staking);
    assert.equal(
      stakingBalanceMinted,
      Staking_Balance,
      `Staking Balance must be equal to ${setDecimals(Staking_Balance)}`
    );

    let founders_And_AffiliatesMinted = await checkBalance(Founders_And_Affiliates);
    assert.equal(
      founders_And_AffiliatesMinted,
      Founders_And_Affiliates_Balance,
      `Founders_And_Affiliates Balance must be equal to ${setDecimals(Founders_And_Affiliates_Balance)}`
    );
  
    let strategyMinted = await checkBalance(Strategy);
    assert.equal(
      strategyMinted,
      Strategy_Balance,
      `Strategy Balance must be equal to ${setDecimals(Strategy_Balance)}`
    );

    let treasury_And_PlatformMinted = await checkBalance(Treasury_And_Platform);
    assert.equal(
      treasury_And_PlatformMinted,
      Treasury_And_Platform_Balance,
      `Treasury_And_Platform Balance must be equal to ${setDecimals(Treasury_And_Platform_Balance)}`
    );

    let private_Sale_1Minted = await checkBalance(Private_Sale_1);
    assert.equal(
      private_Sale_1Minted,
      Private_Sale_1_Balance,
      `Private_Sale_1 Balance must be equal to ${setDecimals(Private_Sale_1_Balance)}`
    );

    let private_Sale_2Minted = await checkBalance(Private_Sale_2);
    assert.equal(
      private_Sale_2Minted,
      Private_Sale_2_Balance,
      `Private_Sale_2 Balance must be equal to ${setDecimals(Private_Sale_2_Balance)}`
    );

    let public_SaleMinted = await checkBalance(Public_Sale);
    assert.equal(
      public_SaleMinted,
      Public_Sale_Balance,
      `Public_Sale Balance must be equal to ${setDecimals(Public_Sale_Balance)}`
    );
  });

  it("Checking maximum supply", async () => {
    let maxSupply = await BitDeltaContract.MAX_SUPPLY();
    let totalSupply = await BitDeltaContract.totalSupply();
    assert.equal(
      convertToNum(maxSupply),
      convertToNum(totalSupply),
      `Treasury Balance must be equal to ${setDecimals(maxSupply)}`
    );
   });

  function convertToNum(balance) {
    return Number(BigInt(balance)) / 1e18;
  }

  function setDecimals(balance) {
    return balance / decimals;
  }

  async function checkBalance(_address) {
    return await BitDeltaContract.balanceOf(_address);
  }
});
