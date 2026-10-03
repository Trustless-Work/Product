// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    address public arbitrator;
    uint256 public amount;
    bool public released;

    event EscrowCreated(address buyer, address seller, address arbitrator, uint256 amount);
    event FundsReleased(address indexed seller, uint256 amount);
    event EscrowCancelled();

    constructor(address _seller, address _arbitrator) {
        buyer = msg.sender;
        seller = _seller;
        arbitrator = _arbitrator;
        amount = msg.value;
        released = false;

        emit EscrowCreated(buyer, seller, arbitrator, amount);
    }

    function release() external {
        require(msg.sender == arbitrator || msg.sender == buyer, "Not authorized");
        require(!released, "Already released");

        released = true;
        payable(seller).transfer(amount);
        emit FundsReleased(seller, amount);
    }

    function cancel() external {
        require(msg.sender == buyer || msg.sender == arbitrator, "Not authorized");
        require(!released, "Already released");

        released = true;
        payable(buyer).transfer(amount);
        emit EscrowCancelled();
    }
}
