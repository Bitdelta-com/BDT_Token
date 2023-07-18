const BitDelta = artifacts.require("./BitDelta.sol");

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

  it("not allowance", async () => {
    const result = await BitDeltaContract.allowance(KOL_Branding, Founders_And_Affiliates, {
      from: KOL_Branding,
    });

    assert.equal(0, result.toNumber(), "wrong result");
  });

  it("allowance", async () => {
    const expectedAmount = 1000;

    await BitDeltaContract.approve(Founders_And_Affiliates, expectedAmount, {from: KOL_Branding});
    const result = await BitDeltaContract.allowance(KOL_Branding, Founders_And_Affiliates, {
      from: KOL_Branding,
    });

    assert.equal(expectedAmount, result.toNumber(), "wrong result");
  });
});
