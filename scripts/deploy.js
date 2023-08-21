const { ethers } = require("hardhat");

async function main() {
  // Fetch contract to deploy
  const Token = await ethers.getContractFactory("Token");

  // Deploy contract
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
