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

  it("approve should throw if spender is zero address", async () => {
    await expectRevert(
      BitDeltaContract.approve(
        "0x0000000000000000000000000000000000000000",
        1000,
        {from: KOL_Branding}
      ),
      "ERC20: approve to the zero address"
    );
  });

  it("approve success", async () => {
    const result = await BitDeltaContract.approve(Referral_And_Airdrop, 1000, {from: KOL_Branding});

    expectEvent(result, "Approval");
  });
});
