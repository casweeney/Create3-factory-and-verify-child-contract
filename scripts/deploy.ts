import { ethers } from "hardhat";

async function main() {
  const etherToPass = ethers.utils.parseEther("2");

  const Parent = await ethers.getContractFactory("Parent");
  const parent = await Parent.deploy();

  await parent.deployed();

  console.log(`Parent Factory deployed to: ${parent.address}`);

  const salt = await parent.createSalt("Casweeney");

  const deployChild = await parent.deployChild(salt, { value: etherToPass });

  const addressFromSalt = await parent.addressFromSalt(salt);

  const verifyChild = await parent.isMyChild(addressFromSalt);

  console.log("Address is deployed from Parent: ", verifyChild);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
