import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Parent", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployParent() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Parent = await ethers.getContractFactory("Parent");
    const parent = await Parent.deploy();

    return { parent, owner, otherAccount };
  }

  describe("Parent Factory Deploy Child", function () {
    it("Should create create child and verify child belongs to parent", async function () {
      const etherToPass = ethers.utils.parseEther("2");
      const { parent } = await loadFixture(deployParent);
      const salt = await parent.createSalt("Casweeney");
      const deployChild = await parent.deployChild(salt, { value: etherToPass });
      const addressFromSalt = await parent.addressFromSalt(salt);
      const verifyChild = await parent.isMyChild(addressFromSalt);

      expect(verifyChild).to.equal(true);
    });
  });
});