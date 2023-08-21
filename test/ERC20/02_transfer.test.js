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
        [
          OWNER,
          Circulating_Supply,
          Users_Onboarding_And_Staking_Rewards,
          Marketing,
          Reasearch_And_Development,
          Team,
          Platform_Governance
      ]
      );
  });

  it("transfer should throw if to address is not valid", async () => {
    await expectRevert(
      BitDeltaContract.transfer(
        "0x0000000000000000000000000000000000000000",
        1000,
        {from: Circulating_Supply}
      ),
      "ERC20: transfer to the zero address"
    );
  });

  it("transfer should throw if balance is insufficient", async () => {
    await expectRevert(
      BitDeltaContract.transfer(Circulating_Supply, 1000, {from: OWNER}),
      "ERC20: transfer amount exceeds balance"
    );
  });

  it("transfer success", async () => {
    const result = await BitDeltaContract.transfer(Team, 1000, {from: Circulating_Supply});

    expectEvent(result, "Transfer");
  });
});
