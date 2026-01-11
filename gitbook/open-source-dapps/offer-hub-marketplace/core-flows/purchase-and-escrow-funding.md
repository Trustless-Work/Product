# Purchase & Escrow Funding

### Goal

Create an escrow per order and fund it from the buyer’s account.

### Steps

1. Buyer places order (goods or services)
2. OfferHub creates escrow via Trustless Work
3. Escrow funding occurs using one of two modes:

#### Mode A (Preferred, if supported)

**Airtm → Stellar escrow funding**

* Buyer’s Airtm balance triggers a USDC transfer that funds the escrow.

#### Mode B

**Airtm debit + escrow funding orchestration**

* Buyer’s Airtm balance is debited
* OfferHub orchestrates escrow funding on Stellar

4. Escrow becomes **Funded**
5. Order moves to **In Progress**

### Outputs

* Escrow created and funded
* Order timeline updated
* Seller notified
