# Funding (Top-Up)

### Goal

Allow a user to add money to their marketplace balance without exposing stablecoins.

### Steps

1. User selects **Add Funds**
2. OfferHub creates an Airtm pay-in intent
3. User completes deposit through Airtm rails
4. Airtm sends webhook confirmation
5. OfferHub updates user balance and order readiness

### Outputs

* User balance increased
* Audit log entry created
