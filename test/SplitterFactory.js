var BN = web3.utils.BN;
require("chai").should();
require("chai").use(require("chai-bignumber")(BN));

const SplitterFactory = artifacts.require("./SplitterFactory.sol");

contract("SplitterFactory", accounts => {
  beforeEach(async () => {
    this.instance = await SplitterFactory.deployed(accounts[0]);
  });

  it("...should set an owner.", async () => {
    var owner = await this.instance.owner();
    owner.should.be.equal(accounts[0]);
  });

  it("...should create a splitter", async () => {
    const receipt = await this.instance.createSplitter(accounts[1], 10, {
      from: accounts[0]
    });
    receipt.logs.length.should.equal(1, "trigger two events");
    receipt.logs[0].event.should.equal(
      "LogCreateSplitter",
      "should be the LogCreateSplitter event"
    );

    receipt.logs[0].args._actor.should.equal(
      accounts[1],
      "should equal to inserted actor"
    );
    receipt.logs[0].args._percentage
      .toNumber()
      .should.equal(10, "should equal to inserted percentage");
    const splitterAdrress = await this.instance.splitters(0);
    const splitterOwner = await this.instance.getSplitterOwner(splitterAdrress);
    splitterOwner.should.equal(accounts[0]);
    try {
      await this.instance.createSplitter(accounts[1], 10, {
        from: accounts[9]
      });
    } catch (err) {
      assert(err.reason === "not authorized");
    }
    try {
      await this.instance.createSplitter(0x0, 10, { from: accounts[0] });
    } catch (err) {
      assert(err.reason === "invalid address");
    }
    try {
      await this.instance.createSplitter(accounts[2], 91, {
        from: accounts[0]
      });
      assert(false, "percentage can't be greater than 100");
    } catch (err) {
      assert(err.reason === "percentage can't be greater than 100");
    }
    try {
      await this.instance.createSplitter(accounts[2], 110, {
        from: accounts[0]
      });
      assert(false, "percentage can't be greater than 100");
    } catch (err) {
      assert(err.reason === "percentage can't be greater than 100");
    }
  });
});
