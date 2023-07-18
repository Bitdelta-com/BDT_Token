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

  it("transferFrom should throw if balance is insufficient", async () => {
    await BitDeltaContract.approve(KOL_Branding, 1000, {from: OWNER});

    await expectRevert(
      BitDeltaContract.transferFrom(OWNER, KOL_Branding, 1000, {from: KOL_Branding}),
      "ERC20: transfer amount exceeds balance"
    );
  });

  it("transferFrom should throw if sender is not approved", async () => {
    await expectRevert(
      BitDeltaContract.transferFrom(Staking, Treasury_And_Platform, 1000, {from: Staking}),
      "ERC20: insufficient allowance"
    );
  });

  it("transferFrom success", async () => {
    await BitDeltaContract.approve(OWNER, 1000, {from: KOL_Branding});
    const result = await BitDeltaContract.transferFrom(KOL_Branding, Treasury_And_Platform, 1000, {
      from: OWNER,
    });

    expectEvent(result, "Transfer");
  });
});
