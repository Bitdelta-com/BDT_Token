const BitDelta = artifacts.require("./BitDelta.sol");
const {expectRevert, expectEvent} = require("@openzeppelin/test-helpers");

contract("BitDelta", (accounts) => {
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
    BitDeltaContract = await BitDelta.new(
        [     OWNER,
          Circulating_Supply,
          Users_Onboarding_And_Staking_Rewards,
          Marketing,
          Reasearch_And_Development,
          Team,
          Platform_Governance ]
    );
  });

  it("transferFrom should throw if balance is insufficient", async () => {
    await BitDeltaContract.approve(KOL_Branding, 1000, {from: OWNER});

    await expectRevert(
      BitDeltaContract.transferFrom(OWNER, Circulating_Supply, 1000, {from: Circulating_Supply}),
      "ERC20: transfer amount exceeds balance"
    );
  });

  it("transferFrom should throw if sender is not approved", async () => {
    await expectRevert(
      BitDeltaContract.transferFrom(Staking, Users_Onboarding_And_Staking_Rewards, 1000, {from: Reasearch_And_Development}),
      "ERC20: insufficient allowance"
    );
  });

  it("transferFrom success", async () => {
    await BitDeltaContract.approve(OWNER, 1000, {from: Circulating_Supply});
    const result = await BitDeltaContract.transferFrom(Circulating_Supply, Users_Onboarding_And_Staking_Rewards, 1000, {
      from: OWNER,
    });

    expectEvent(result, "Transfer");
  });
});
