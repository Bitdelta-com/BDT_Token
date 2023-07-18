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

  it("transfer should throw if to address is not valid", async () => {
    await expectRevert(
      BitDeltaContract.transfer(
        "0x0000000000000000000000000000000000000000",
        1000,
        {from: KOL_Branding}
      ),
      "ERC20: transfer to the zero address"
    );
  });

  it("transfer should throw if balance is insufficient", async () => {
    await expectRevert(
      BitDeltaContract.transfer(KOL_Branding, 1000, {from: OWNER}),
      "ERC20: transfer amount exceeds balance"
    );
  });

  it("transfer success", async () => {
    const result = await BitDeltaContract.transfer(Team_Incentive, 1000, {from: KOL_Branding});

    expectEvent(result, "Transfer");
  });
});
