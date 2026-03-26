---
icon: play
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
---

# Introduction

### Go to Mainnet

Moving to mainnet is the final step to bring your integration into production. It involves switching from test environments to live network configurations, where all interactions execute with real assets and users.

Before proceeding, ensure your application has been fully tested on testnet and follows security best practices. Proper setup is critical to guarantee safe, reliable, and production-ready behavior.

For most integrations, the move starts with three changes:

1. Use the correct **mainnet asset issuer**.
2. Switch your API requests to the **mainnet base URL**.
3. Generate and use a **mainnet API key**.

Start here:

* [API REST](api-rest.md)

Useful references:

* [Trustlines](../introduction/stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md)
* [API REST Introduction](../api-rest/introduction.md)
* [Request API Key](../introduction/developer-resources/request-api-key.md)
