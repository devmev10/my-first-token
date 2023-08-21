const { ethers } = require("hardhat");

async function main() {
  // Fetch contract to deploy
  const Token = await ethers.getContractFactory("Token");

  // Deploy contract
  // The await here ensures that you get a transaction receipt, meaning the transaction has been sent successfully and is now in the transaction pool waiting to be mined. However, it doesn't guarantee that the transaction has been mined or confirmed by the network.
  const token = await Token.deploy();

  // The line await token.deployed(); ensures that the transaction has been mined and the contract is live on the network. It waits for sufficient confirmations to guarantee that the contract deployment was successful.
  await token.deployed();
  console.log("Token deployed at:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
