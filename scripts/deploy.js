
const hre = require("hardhat");

async function main() {
 const [manager] = await ethers.getSigners()
 const Lottery = await hre.ethers.getContractFactory("Lottery");
 const lottery = await Lottery.deploy();
 
 const address = await lottery.getAddress()
 console.log("Deployed Lottery contract at:",address)
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
