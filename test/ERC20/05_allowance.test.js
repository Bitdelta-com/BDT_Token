const BitDelta = artifacts.require("./BitDelta.sol");

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

  it("not allowance", async () => {
    const result = await BitDeltaContract.allowance(Circulating_Supply, Users_Onboarding_And_Staking_Rewards, {
      from: Circulating_Supply,
    });

    assert.equal(0, result.toNumber(), "wrong result");
  });

  it("allowance", async () => {
    const expectedAmount = 1000;

    await BitDeltaContract.approve(Users_Onboarding_And_Staking_Rewards, expectedAmount, {from: Circulating_Supply});
    const result = await BitDeltaContract.allowance(Circulating_Supply, Reasearch_And_Development, {
      from: Circulating_Supply,
    });

    assert.equal(expectedAmount, result.toNumber(), "wrong result");
  });
});
