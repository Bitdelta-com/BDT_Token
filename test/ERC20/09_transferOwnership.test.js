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

  it("only owner can transfer ownership", async () => {
    await expectRevert(
      BitDeltaContract.transferOwnership(KOL_Branding, {from: KOL_Branding}),
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
    let result = await BitDeltaContract.transferOwnership(KOL_Branding, {from: OWNER});
    expectEvent(result, "OwnershipTransferred");
  });
});
