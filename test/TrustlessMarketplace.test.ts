import { expect } from "chai";
import { ethers } from "hardhat";
import { TrustlessMarketplace } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("TrustlessMarketplace", function () {
  let marketplace: TrustlessMarketplace;
  let client: SignerWithAddress;
  let freelancer: SignerWithAddress;
  let otherUser: SignerWithAddress;

  beforeEach(async function () {
    [client, freelancer, otherUser] = await ethers.getSigners();

    const MarketplaceFactory = await ethers.getContractFactory("TrustlessMarketplace");
    marketplace = await MarketplaceFactory.deploy();
    await marketplace.waitForDeployment();
  });

  describe("Job Creation", function () {
    it("should create a job with correct details", async function () {
      const amount = ethers.parseEther("1");
      const tx = await marketplace.createJob(
        "Test Job",
        "Test Description",
        amount,
        ethers.parseEther("0.5"),
        { value: amount }
      );

      const receipt = await tx.wait();
      const event = receipt?.logs.find((log: any) => log.fragment?.name === "JobCreated");
      expect(event).to.not.be.undefined;
    });

    it("should reject invalid amount", async function () {
      await expect(
        marketplace.connect(client).createJob("Test", "Desc", ethers.parseEther("1"), ethers.parseEther("0.5"), {
          value: ethers.parseEther("0.5"),
        })
      ).to.be.revertedWithCustomError(marketplace, "InvalidAmount");
    });

    it("should track client jobs", async function () {
      const amount = ethers.parseEther("1");
      await marketplace.createJob("Job 1", "Desc 1", amount, amount, { value: amount });

      const jobs = await marketplace.getClientJobs(client.address);
      expect(jobs.length).to.equal(1);
    });
  });

  describe("Freelancer Assignment", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1");
      await marketplace.createJob("Job", "Desc", amount, amount, { value: amount });
    });

    it("should assign a freelancer", async function () {
      const tx = await marketplace.assignFreelancer(1, { from: freelancer.address });
      expect(tx).to.not.be.undefined;
    });

    it("should track freelancer jobs", async function () {
      await marketplace.assignFreelancer(1, { from: freelancer.address });

      const jobs = await marketplace.getFreelancerJobs(freelancer.address);
      expect(jobs.length).to.equal(1);
    });
  });

  describe("Milestones", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1");
      await marketplace.createJob("Job", "Desc", amount, amount, { value: amount });
      await marketplace.assignFreelancer(1, { from: freelancer.address });
      await marketplace.startWork(1, { from: freelancer.address });
    });

    it("should create a milestone", async function () {
      await marketplace.createMilestone(1, "Milestone 1", ethers.parseEther("0.5"), { from: client.address });

      const milestones = await marketplace.getMilestones(1);
      expect(milestones.length).to.equal(1);
    });

    it("should release a milestone", async function () {
      await marketplace.createMilestone(1, "Milestone 1", ethers.parseEther("0.5"), { from: client.address });

      const tx = await marketplace.releaseMilestone(1, 0);
      expect(tx).to.not.be.undefined;
    });
  });

  describe("Job Completion", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1");
      await marketplace.createJob("Job", "Desc", amount, amount, { value: amount });
      await marketplace.assignFreelancer(1, { from: freelancer.address });
      await marketplace.startWork(1, { from: freelancer.address });
      await marketplace.createMilestone(1, "Milestone 1", ethers.parseEther("1"), { from: client.address });
    });

    it("should complete job and transfer funds", async function () {
      const freelancerBalanceBefore = await ethers.provider.getBalance(freelancer.address);
      const clientBalanceBefore = await ethers.provider.getBalance(client.address);

      await marketplace.releaseMilestone(1, 0, { from: client.address });
      await marketplace.completeJob(1, { from: client.address });

      const freelancerBalanceAfter = await ethers.provider.getBalance(freelancer.address);
      const clientBalanceAfter = await ethers.provider.getBalance(client.address);

      expect(freelancerBalanceAfter).to.be.greaterThan(freelancerBalanceBefore);
      expect(clientBalanceAfter).to.be.lessThan(clientBalanceBefore);
    });
  });

  describe("Disputes", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1");
      await marketplace.createJob("Job", "Desc", amount, amount, { value: amount });
      await marketplace.assignFreelancer(1, { from: freelancer.address });
      await marketplace.startWork(1, { from: freelancer.address });
    });

    it("should initiate a dispute", async function () {
      const tx = await marketplace.initiateDispute(1, "Poor quality work");
      expect(tx).to.not.be.undefined;
    });

    it("should resolve dispute and pay winner", async function () {
      await marketplace.initiateDispute(1, "Poor quality work", { from: freelancer.address });

      const freelancerBalanceBefore = await ethers.provider.getBalance(freelancer.address);

      await marketplace.resolveDispute(1, freelancer.address);

      const freelancerBalanceAfter = await ethers.provider.getBalance(freelancer.address);
      expect(freelancerBalanceAfter).to.be.greaterThan(freelancerBalanceBefore);
    });
  });

  describe("Job Cancellation", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1");
      await marketplace.createJob("Job", "Desc", amount, amount, { value: amount });
    });

    it("should cancel a job and refund client", async function () {
      const clientBalanceBefore = await ethers.provider.getBalance(client.address);

      await marketplace.cancelJob(1, { from: client.address });

      const clientBalanceAfter = await ethers.provider.getBalance(client.address);
      expect(clientBalanceAfter).to.be.greaterThan(clientBalanceBefore);
    });
  });
});
