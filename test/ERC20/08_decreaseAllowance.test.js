const BitDelta = artifacts.require("./BitDelta.sol");
const {expectEvent} = require("@openzeppelin/test-helpers");

contract("BitDelta", (accounts) => {
  // fetch accounts on different index
  let [
    OWNER,
    Circulating_Supply,
    Users_Onboarding_And_Staking_Rewards,
    Marketing,
    Reasearch_And_Development,
    Team,
    Platform_Governance
  ] = accounts;
  let BitDeltaContract;

  beforeEach(async () => {
    BitDeltaContract = await BitDelta.new(
        [ OWNER,
          Circulating_Supply,
          Users_Onboarding_And_Staking_Rewards,
          Marketing,
          Reasearch_And_Development,
          Team,
          Platform_Governance,]
    );
  });

  it("decreaseAllowance success", async () => {
    const initialAmount = 1000;
    const expectedAmount = 500;

    await BitDeltaContract.approve(Reasearch_And_Development, initialAmount, {from:           Circulating_Supply,
    });
    const resultBeforeIncrease = await BitDeltaContract.allowance(
      Circulating_Supply,
    
      Reasearch_And_Development,
      {from: Circulating_Supply}
    );
    const resultIncrease = await BitDeltaContract.decreaseAllowance(
      Reasearch_And_Development,
      500,
      {from: Circulating_Supply}
    );
    const resultAfterIncrease = await BitDeltaContract.allowance(
      Circulating_Supply,
      Reasearch_And_Development,
      {from: Circulating_Supply}
    );

    assert.equal(
      initialAmount,
      resultBeforeIncrease.toNumber(),
      "wrong result berore increase"
    );
    assert.equal(
      expectedAmount,
      resultAfterIncrease.toNumber(),
      "wrong result after increase"
    );
    expectEvent(resultIncrease, "Approval");
  });
});
