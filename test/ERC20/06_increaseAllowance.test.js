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
    Platform_Governance,
  ] = accounts;
  let BitDeltaContract;

  beforeEach(async () => {
    BitDeltaContract = await BitDelta.new(
        [       OWNER,
          Circulating_Supply,
          Users_Onboarding_And_Staking_Rewards,
          Marketing,
          Reasearch_And_Development,
          Team,
          Platform_Governance]
    );
  });

  it("increaseAllowance success", async () => {
    const initialAmount = 1000;
    const expectedAmount = 2000;

    await BitDeltaContract.approve(Platform_Governance, initialAmount, {from: Circulating_Supply});
    const resultBeforeIncrease = await BitDeltaContract.allowance(
      Circulating_Supply,
      Platform_Governance,
      {from: Circulating_Supply}
    );
    const resultIncrease = await BitDeltaContract.increaseAllowance(
        Platform_Governance,
      initialAmount,
      {from: Circulating_Supply}
    );
    const resultAfterIncrease = await BitDeltaContract.allowance(
      Circulating_Supply,
      Platform_Governance,
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
