const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token", () => {
  it("has a name", async () => {
    // fetch token from blockchain
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    // Read token name
    const name = await token.name();

    // Check that the name is correct
    expect(name).to.equal("My Token");
  });
});
