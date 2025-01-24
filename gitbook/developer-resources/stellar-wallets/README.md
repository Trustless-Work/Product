---
description: A Comprehensive Developer's Guide to Stellar Wallet Integrations
---

# Stellar Wallet 

## Introduction to Stellar Wallets 

Stellar wallets are essential tools for interacting with the Stellar blockchain, enabling developers and users to securely manage, send, and receive digital assets. 
This section covers the setup and integration of popular Stellar wallets:

* [**Freighter Wallet**](wallets/freighter-wallet.md)
* [**Albedo Wallet**](wallets/albedo-wallet.md)
* [**xBull Wallet**](wallets/xbull-wallet.md)
* [**Rabet Wallet**](wallets/rabet-wallet.md)
* [**Lobstr Wallet**](wallets/lobstr-wallet.md)
* [**Hana Wallet**](wallets/hana-wallet.md)

## Key Concepts

### Public and Private Keys

* **Public Key:** Your `Stellar address`, used to receive assets. This can be shared publicly.
* **Private Key:** Your secret key used to authorize transactions. This must be kept secure and never shared.
* **Never share your private key with anyone**

## TrustLines

Stellar accounts need to establish trustlines to receive custom assets. Trustlines represent a relationship between two accounts, where one account trusts the other to issue a specific asset. This allows the receiving account to accept and hold that asset.

Trustlines are crucial in Stellar for:

* Establishing trust with asset issuers
* Enabling receipt of custom tokens
* Requiring a small minimum balance to create

## Minimum Balance Requirements

* Stellar accounts require a minimum balance (currently 0.5 XLM)
* Each trustline adds to the minimum balance requirement
* Helps prevent spam and ensures network stability

## Security Best Practices
* Use hardware wallets when possible
* Enable two-factor authentication
* Store private keys offline
* Use secure, updated browsers
* Regularly update wallet software
* Be cautious of phishing sites
