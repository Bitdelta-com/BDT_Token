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
    Platform_Governance
  ] = accounts;
  let BitDeltaContract;

  beforeEach(async () => {
    BitDeltaContract = await BitDelta.new(
        [   OWNER,
    Circulating_Supply,
    Users_Onboarding_And_Staking_Rewards,
    Marketing,
    Reasearch_And_Development,
    Team,
    Platform_Governance]
    );
  });

  it("only owner can transfer ownership", async () => {
    await expectRevert(
      BitDeltaContract.transferOwnership(Circulating_Supply, {from: Circulating_Supply}),
      "Ownable: caller is not the owner"
    );
  });

  it("new owner cannot be zero address", async () => {
    await expectRevert(
      BitDeltaContract.transferOwnership(
        "0x0000000000000000000000000000000000000000",
        {from: OWNER}
      ),
      "Ownable: new owner is the zero address"
    );
  });

  it("transfer ownership success", async () => {
    let result = await BitDeltaContract.transferOwnership(Circulating_Supply, {from: OWNER});
    expectEvent(result, "OwnershipTransferred");
  });
});
