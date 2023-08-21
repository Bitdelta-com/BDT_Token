const BitDelta = artifacts.require("./BitDelta.sol");
const chalk = require("chalk");
const log = console.log;
const decimals = 1e18;
const MAX_SUPPLY = 2_400_000_000 * decimals;

contract("BitDelta", (accounts) => {
  let Circulating_Supply_Balance = 600_000_000 * decimals;
  let Users_Onboarding_And_Staking_Rewards_Balance = 480_000_000 * decimals;
  let Marketing_Balance = 480_000_000 * decimals;
  let Reasearch_And_Development_Balance = 240_000_000 * decimals;
  let Team_Balance = 240_000_000 * decimals;
  let Platform_Governance_Balance = 360_000_000 * decimals;

  // fetch accounts on different index
  let [
    OWNER,
    Circulating_Supply,
    Users_Onboarding_And_Staking_Rewards,
    Marketing,
    Reasearch_And_Development,
    Team,
    Platform_Governance,
  ] = accounts;
  let BitDeltaContract;

  beforeEach(async () => {
    log(`
        Contract deployed by ${chalk.yellow.bold("OWNER")}(${chalk.green(
      OWNER
    )})          
        ${chalk.yellow.bold("Circulating_Supply")} Address:-${chalk.green(
          Circulating_Supply
    )}             
        ${chalk.yellow.bold("Users_Onboarding_And_Staking_Rewards")} Address:-${chalk.green(
          Users_Onboarding_And_Staking_Rewards
    )}           
        ${chalk.yellow.bold("Marketing")} Address:-${chalk.green(
          Marketing
    )}
        ${chalk.yellow.bold("Reasearch_And_Development")} Address:-${chalk.green(
          Reasearch_And_Development
    )}
        ${chalk.yellow.bold("Team")} Address:-${chalk.green(Team)}
        
        ${chalk.yellow.bold("Platform_Governance")} Address:-${chalk.green(
          Platform_Governance
    )}
       
    `);

    BitDeltaContract = await BitDelta.new([
      Circulating_Supply,
      Users_Onboarding_And_Staking_Rewards,
      Marketing,
      Reasearch_And_Development,
      Team,
      Platform_Governance,
    ]);
  });

  it("Checking balances for all--", async () => {
    let Circulating_Supply_Minted = await checkBalance(Circulating_Supply);
    assert.equal(
      Circulating_Supply_Minted,
      Circulating_Supply_Balance,
      `Circulating_Supply_Balance must be equal to ${setDecimals(
        Circulating_Supply_Balance
      )}`
    );

    let Users_Onboarding_And_Staking_Rewards_Minted = await checkBalance(Users_Onboarding_And_Staking_Rewards);
    assert.equal(
      Users_Onboarding_And_Staking_Rewards_Minted,
      Users_Onboarding_And_Staking_Rewards_Balance,
      `Users_Onboarding_And_Staking_Rewards_Balance must be equal to ${setDecimals(
        Users_Onboarding_And_Staking_Rewards_Balance
      )}`
    );
    let Marketing_Minted = await checkBalance(Marketing);
    assert.equal(
      Marketing_Minted,
      Marketing_Balance,
      `Marketing_Balance must be equal to ${setDecimals(
        Marketing_Balance
      )}`
    );
    let Reasearch_And_Development_Minted = await checkBalance(Reasearch_And_Development);
    assert.equal(
      Reasearch_And_Development_Minted,
      Reasearch_And_Development_Balance,
      `Reasearch_And_Development_Minted must be equal to ${setDecimals(
        Reasearch_And_Development_Balance
      )}`
    );

    let Team_Minted = await checkBalance(Team);
    assert.equal(
      Team_Minted,
      Team_Balance,
      `Team_Balance must be equal to ${setDecimals(
        Team_Balance
      )}`
    );

    let Platform_Governance_Minted = await checkBalance(Platform_Governance);
    assert.equal(
      Platform_Governance_Minted,
      Platform_Governance_Balance,
      `Platform_Governance_Balance must be equal to ${setDecimals(
        Platform_Governance_Balance
      )}`
    );

   
  });

  it("Checking maximum supply", async () => {
    let maxSupply = MAX_SUPPLY;
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
