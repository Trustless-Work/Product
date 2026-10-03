const Escrow = artifacts.require("Escrow");

module.exports = async function(deployer, network, accounts) {
    const seller = accounts[1];
    const arbitrator = accounts[2];

    await deployer.deploy(Escrow, seller, arbitrator);
};
