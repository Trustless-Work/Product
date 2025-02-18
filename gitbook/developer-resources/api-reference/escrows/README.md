---
icon: scribble
description: >-
  The smart contract that holds funds and enforces the conditions of the
  agreement between the Service Provider and the Signer.
---

# Escrows

### Introduction

The purpose of this documentation is to guide users through the process of utilizing the Escrow system effectively. By understanding its functionalities and endpoints, users can ensure that their transactions are handled with precision and security. This guide will cover the essentials, from initialization to finalizing transactions, enabling a seamless experience for all parties involved.

#### Escrow's Endpoints Overview

When using the escrow's endpoints, users can seamlessly manage escrows. Here's a breakdown of the functionalities and how to utilize them effectively:

1. **Fund Escrow:** The Fund Escrow endpoint allows users to deposit funds into an escrow account. This process initiates the secure holding of funds until the transaction conditions are fulfilled. Users must specify the source account from which the funds will be withdrawn and the escrow account that will receive the funds.&#x20;
2. **Get Escrow by Engagement ID:** This endpoint retrieves detailed information about a specific escrow transaction based on its engagement ID.
3. **Resolve Dispute:** This endpoint facilitates the resolution of conflicts that may arise during the escrow process. Users engaged in an escrow transaction can use this feature to communicate issues and seek mediation for a fair resolution.
4.  #### Change Milestone Flag (Approve)

    The Change Milestone Flag endpoint allows users to set specific milestones within an escrow transaction as approved.&#x20;
5. **Change Milestone Status (Complete):**\
   The Change Milestone Status endpoint enables users to mark specific milestones within an escrow transaction as complete.&#x20;
6. **Get Multiple Escrow Balance:** This endpoint allows users to retrieve the balances of multiple escrow accounts simultaneously.&#x20;
7. **Distribute Escrow Funds:**&#x20;
8. **Complete Escrow Transaction:** The Complete Escrow Transaction endpoint allows users to finalize their escrow transactions once all milestones and conditions have been met.&#x20;

These endpoints ensure secure transactions by leveraging Stellar's infrastructure, guaranteeing transparency and reliability.
