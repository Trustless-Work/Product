// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TrustlessMarketplace
 * @dev A trustless freelance marketplace allowing clients and freelancers to transact securely.
 */
contract TrustlessMarketplace is ReentrancyGuard {
    struct Job {
        uint256 id;
        address client;
        address freelancer;
        uint256 amount;
        uint256 milestoneAmount;
        JobStatus status;
        bool completed;
        bool disputed;
    }

    enum JobStatus {
        Open,
        Assigned,
        InProgress,
        Completed,
        Cancelled
    }

    struct Milestone {
        uint256 index;
        string description;
        uint256 amount;
        bool released;
    }

    struct Dispute {
        uint256 jobId;
        address initiator;
        uint256 timestamp;
        string reason;
        bool resolved;
    }

    uint256 public jobCounter;
    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Milestone[]) public milestones;
    mapping(uint256 => Dispute[]) public disputes;
    mapping(address => uint256[]) public freelancerJobs;
    mapping(address => uint256[]) public clientJobs;

    event JobCreated(uint256 indexed jobId, address indexed client, uint256 amount);
    event JobAssigned(uint256 indexed jobId, address indexed freelancer);
    event MilestoneCreated(uint256 indexed jobId, uint256 indexed milestoneIndex, string description, uint256 amount);
    event MilestoneReleased(uint256 indexed jobId, uint256 indexed milestoneIndex);
    event JobCompleted(uint256 indexed jobId);
    event JobCancelled(uint256 indexed jobId);
    event DisputeInitiated(uint256 indexed jobId, address indexed initiator, string reason);
    event DisputeResolved(uint256 indexed jobId, address winner);

    error InvalidAmount();
    error JobNotFound();
    error NotClient();
    error NotFreelancer();
    error JobNotInProgress();
    error MilestoneAlreadyReleased();
    error InsufficientMilestones();
    error TransferFailed();
    error DisputeAlreadyExists();
    error DisputeNotResolved();
    error NotInitiator();
    error OnlyClientOrFreelancer();

    modifier onlyJobClient(uint256 _jobId) {
        if (jobs[_jobId].client != msg.sender) revert NotClient();
        _;
    }

    modifier onlyJobFreelancer(uint256 _jobId) {
        if (jobs[_jobId].freelancer != msg.sender) revert NotFreelancer();
        _;
    }

    modifier onlyClientOrFreelancer(uint256 _jobId) {
        if (jobs[_jobId].client != msg.sender && jobs[_jobId].freelancer != msg.sender) revert OnlyClientOrFreelancer();
        _;
    }

    modifier jobExists(uint256 _jobId) {
        if (jobs[_jobId].id == 0) revert JobNotFound();
        _;
    }

    function createJob(
        string calldata _title,
        string calldata _description,
        uint256 _amount,
        uint256 _milestoneAmount
    ) external payable nonReentrant returns (uint256) {
        if (_amount == 0 || msg.value != _amount) revert InvalidAmount();

        jobCounter++;
        Job storage job = jobs[jobCounter];
        job.id = jobCounter;
        job.client = msg.sender;
        job.amount = _amount;
        job.milestoneAmount = _milestoneAmount;
        job.status = JobStatus.Open;
        job.completed = false;
        job.disputed = false;

        clientJobs[msg.sender].push(jobCounter);

        emit JobCreated(jobCounter, msg.sender, _amount);
        return jobCounter;
    }

    function assignFreelancer(uint256 _jobId) external jobExists(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];
        if (job.status != JobStatus.Open) revert InvalidAmount();
        if (job.freelancer != address(0)) revert InvalidAmount();

        job.freelancer = msg.sender;
        job.status = JobStatus.Assigned;

        freelancerJobs[msg.sender].push(_jobId);

        emit JobAssigned(_jobId, msg.sender);
    }

    function startWork(uint256 _jobId) external jobExists(_jobId) onlyJobFreelancer(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];
        if (job.status != JobStatus.Assigned) revert JobNotInProgress();

        job.status = JobStatus.InProgress;
    }

    function createMilestone(
        uint256 _jobId,
        string calldata _description,
        uint256 _amount
    ) external jobExists(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];
        if (job.status != JobStatus.InProgress && job.status != JobStatus.Assigned) revert JobNotInProgress();

        Milestone memory milestone = Milestone({
            index: milestones[_jobId].length,
            description: _description,
            amount: _amount,
            released: false
        });

        milestones[_jobId].push(milestone);

        emit MilestoneCreated(_jobId, milestone.index, _description, _amount);
    }

    function releaseMilestone(uint256 _jobId, uint256 _milestoneIndex) external nonReentrant jobExists(_jobId) {
        Job storage job = jobs[_jobId];
        Milestone[] storage jobMilestones = milestones[_jobId];

        if (_milestoneIndex >= jobMilestones.length) revert InsufficientMilestones();
        if (jobMilestones[_milestoneIndex].released) revert MilestoneAlreadyReleased();

        // Either the client or the freelancer can release a milestone
        if (msg.sender != job.client && msg.sender != job.freelancer) revert OnlyClientOrFreelancer();

        jobMilestones[_milestoneIndex].released = true;

        emit MilestoneReleased(_jobId, _milestoneIndex);
    }

    function completeJob(uint256 _jobId) external jobExists(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];
        Milestone[] storage jobMilestones = milestones[_jobId];

        if (msg.sender != job.client) revert NotClient();
        if (job.status != JobStatus.InProgress) revert JobNotInProgress();
        if (jobMilestones.length == 0) revert InsufficientMilestones();

        // Check all milestones are released
        for (uint256 i = 0; i < jobMilestones.length; i++) {
            if (!jobMilestones[i].released) revert MilestoneAlreadyReleased();
        }

        job.status = JobStatus.Completed;
        job.completed = true;

        // Release funds to freelancer
        (bool success, ) = job.freelancer.call{value: job.amount}("");
        if (!success) revert TransferFailed();

        emit JobCompleted(_jobId);
    }

    function cancelJob(uint256 _jobId) external jobExists(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];

        if (msg.sender != job.client && msg.sender != job.freelancer) revert OnlyClientOrFreelancer();
        if (job.status == JobStatus.Completed) revert JobNotInProgress();
        if (job.disputed) revert DisputeAlreadyExists();

        job.status = JobStatus.Cancelled;

        // Refund client
        (bool success, ) = job.client.call{value: address(this).balance}("");
        if (!success) revert TransferFailed();

        emit JobCancelled(_jobId);
    }

    function initiateDispute(
        uint256 _jobId,
        string calldata _reason
    ) external jobExists(_jobId) nonReentrant {
        Job storage job = jobs[_jobId];
        if (msg.sender != job.client && msg.sender != job.freelancer) revert OnlyClientOrFreelancer();
        if (job.disputed) revert DisputeAlreadyExists();
        if (job.status == JobStatus.Completed) revert JobNotInProgress();

        job.disputed = true;

        Dispute memory dispute = Dispute({
            jobId: _jobId,
            initiator: msg.sender,
            timestamp: block.timestamp,
            reason: _reason,
            resolved: false
        });

        disputes[_jobId].push(dispute);

        emit DisputeInitiated(_jobId, msg.sender, _reason);
    }

    function resolveDispute(uint256 _jobId, address _winner) external nonReentrant jobExists(_jobId) {
        Job storage job = jobs[_jobId];
        if (!job.disputed) revert DisputeNotResolved();
        if (job.status == JobStatus.Completed) revert JobNotInProgress();

        job.disputed = false;
        job.status = JobStatus.Completed;

        // Send funds to winner
        (bool success, ) = _winner.call{value: address(this).balance}("");
        if (!success) revert TransferFailed();

        emit DisputeResolved(_jobId, _winner);
    }

    function getJob(uint256 _jobId) external view jobExists(_jobId) returns (
        address client,
        address freelancer,
        uint256 amount,
        JobStatus status,
        bool completed,
        bool disputed
    ) {
        Job storage job = jobs[_jobId];
        return (job.client, job.freelancer, job.amount, job.status, job.completed, job.disputed);
    }

    function getMilestones(uint256 _jobId) external view jobExists(_jobId) returns (Milestone[] memory) {
        return milestones[_jobId];
    }

    function getDisputes(uint256 _jobId) external view jobExists(_jobId) returns (Dispute[] memory) {
        return disputes[_jobId];
    }

    function getFreelancerJobs(address _freelancer) external view returns (uint256[] memory) {
        return freelancerJobs[_freelancer];
    }

    function getClientJobs(address _client) external view returns (uint256[] memory) {
        return clientJobs[_client];
    }

    receive() external payable {
        // Allow contract to receive ETH
    }
}
