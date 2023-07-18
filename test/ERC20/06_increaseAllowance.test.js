const BitDelta = artifacts.require("./BitDelta.sol");
const {expectEvent} = require("@openzeppelin/test-helpers");

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

  it("increaseAllowance success", async () => {
    const initialAmount = 1000;
    const expectedAmount = 2000;

    await BitDeltaContract.approve(Platform_Governance, initialAmount, {from: KOL_Branding});
    const resultBeforeIncrease = await BitDeltaContract.allowance(
        KOL_Branding,
      Platform_Governance,
      {from: KOL_Branding}
    );
    const resultIncrease = await BitDeltaContract.increaseAllowance(
        Platform_Governance,
      initialAmount,
      {from: KOL_Branding}
    );
    const resultAfterIncrease = await BitDeltaContract.allowance(
        KOL_Branding,
      Platform_Governance,
      {from: KOL_Branding}
    );

    assert.equal(
      initialAmount,
      resultBeforeIncrease.toNumber(),
      "wrong result berore increase"
    );
    assert.equal(
      expectedAmount,
      resultAfterIncrease.toNumber(),
      "wrong result after increase"
    );
    expectEvent(resultIncrease, "Approval");
  });
});
