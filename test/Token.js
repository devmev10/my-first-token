const { ethers } = require("hardhat");
const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token, accounts, deployer, receiver;

  beforeEach(async () => {
    // fetch token from blockchain
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Dapp University", "DAPP", 1000000); //This feeds the Constructor function in Token.sol

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
  });

  describe("Deployment", () => {
    const name = "Dapp University";
    const symbol = "DAPP";
    const decimals = "18";
    const totalSupply = tokens(1000000);

    it("has correct name", async () => {
      expect(await token.name()).to.equal(name);
    });

    it("has correct symbol", async () => {
      expect(await token.symbol()).to.equal(symbol);
    });

    it("has correct decimals", async () => {
      expect(await token.decimals()).to.equal(decimals);
    });

    it("has correct total supply", async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it("assigns total supply to deployer", async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });

  describe("Sending Token", () => {
    let amount;

    it("Transfer token balances", async () => {
      // log balance before transfer
      console.log(
        "Deployer balance before transfer:",
        await token.balanceOf(deployer.address)
      );
      console.log(
        "Receiver balance before transfer:",
        await token.balanceOf(receiver.address)
      );

      // transfer tokens
      amount = tokens(100);
      let transaction = await token
        .connect(deployer)
        .transfer(receiver.address, amount);
      let result = transaction.wait();

      // log balance after transfer
      console.log(
        "Deployer balance after transfer:",
        await token.balanceOf(deployer.address)
      );
      console.log(
        "Receiver balance after transfer:",
        await token.balanceOf(receiver.address)
      );

      // ensure tokens transfered
    });
  });
});
