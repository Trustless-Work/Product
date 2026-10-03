import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TrustlessMarketplace...");

  const Marketplace = await ethers.getContractFactory("TrustlessMarketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();

  const address = await marketplace.getAddress();
  console.log("TrustlessMarketplace deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
