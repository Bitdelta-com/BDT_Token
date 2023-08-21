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

  it("approve should throw if spender is zero address", async () => {
    await expectRevert(
      BitDeltaContract.approve(
        "0x0000000000000000000000000000000000000000",
        1000,
        {from: Circulating_Supply}
      ),
      "ERC20: approve to the zero address"
    );
  });

  it("approve success", async () => {
    const result = await BitDeltaContract.approve(Reasearch_And_Development, 1000, {from: Circulating_Supply});

    expectEvent(result, "Approval");
  });
});
