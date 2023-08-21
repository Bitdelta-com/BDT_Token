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
        [ OWNER,
          Circulating_Supply,
          Users_Onboarding_And_Staking_Rewards,
          Marketing,
          Reasearch_And_Development,
          Team,
          Platform_Governance]
    );
  });

  it("only owner can renounce ownership", async () => {
    await expectRevert(
      BitDeltaContract.renounceOwnership({from: KOL_Branding}),
      "Ownable: caller is not the owner"
    );
  });

  it("renounce ownership success", async () => {
    let result = await BitDeltaContract.renounceOwnership({from: OWNER});
    expectEvent(result, "OwnershipTransferred");
    let newOwner = await BitDeltaContract.owner();
    assert.equal(
      newOwner,
      "0x0000000000000000000000000000000000000000",
      "renounce ownership failed"
    );
  });
});
