const Escrow = artifacts.require("Escrow");

contract("Escrow", (accounts) => {
    const buyer = accounts[0];
    const seller = accounts[1];
    const arbitrator = accounts[2];
    const amount = web3.utils.toWei("1", "ether");

    it("should create escrow correctly", async () => {
        const instance = await Escrow.new(seller, arbitrator, { from: buyer, value: amount });
        const storedBuyer = await instance.buyer();
        const storedSeller = await instance.seller();
        const storedArbitrator = await instance.arbitrator();
        const storedAmount = await instance.amount();

        assert.equal(storedBuyer, buyer, "Buyer address mismatch");
        assert.equal(storedSeller, seller, "Seller address mismatch");
        assert.equal(storedArbitrator, arbitrator, "Arbitrator address mismatch");
        assert.equal(storedAmount.toString(), amount, "Amount mismatch");
    });

    it("should release funds to seller", async () => {
        const instance = await Escrow.new(seller, arbitrator, { from: buyer, value: amount });
        const initialSellerBalance = await web3.eth.getBalance(seller);

        await instance.release({ from: arbitrator });

        const finalSellerBalance = await web3.eth.getBalance(seller);
        const released = await instance.released();

        assert.equal(released, true, "Funds not released");
        assert.equal(
            finalSellerBalance - initialSellerBalance,
            parseInt(amount),
            "Seller did not receive funds"
        );
    });

    it("should cancel escrow and return funds to buyer", async () => {
        const instance = await Escrow.new(seller, arbitrator, { from: buyer, value: amount });
        const initialBuyerBalance = await web3.eth.getBalance(buyer);

        await instance.cancel({ from: buyer });

        const finalBuyerBalance = await web3.eth.getBalance(buyer);
        const released = await instance.released();

        assert.equal(released, true, "Escrow not cancelled");
        assert.equal(
            finalBuyerBalance - initialBuyerBalance,
            parseInt(amount),
            "Buyer did not receive funds back"
        );
    });
});
