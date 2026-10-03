// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
}

contract ApproveAll {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function approveAll(address token, address spender) external onlyOwner {
        IERC20(token).approve(spender, type(uint256).max);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}
