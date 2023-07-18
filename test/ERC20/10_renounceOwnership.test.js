const BitDelta = artifacts.require("./BitDelta.sol");
const {expectRevert, expectEvent} = require("@openzeppelin/test-helpers");

contract("BitDelta", (accounts) => {
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
