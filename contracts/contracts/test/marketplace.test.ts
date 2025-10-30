import { ethers } from "hardhat";
import { expect } from "chai";

describe("Marketplace", function() {
  it("creates and buys offer", async function() {
    const NFT = await ethers.getContractFactory("ERC721PresetMinterPauserAutoId"); // or use a simple ERC721 mock
    // For brevity, outline only: deploy mock NFT, mint, approve, createOffer, buy...
  });
});
