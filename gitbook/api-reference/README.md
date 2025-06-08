---
icon: code
layout:
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
---

# API Reference

## Introduction to the Trustless Work REST API

The Trustless Work REST API is designed to offer decentralized escrow solutions by leveraging the power of smart contracts on the Stellar blockchain through Soroban. This API enables platforms and businesses to integrate secure, fast, and transparent escrow services, eliminating the need to rely on centralized intermediaries.

### What is the API for?

The Trustless Work API is a key component for any platform that requires secure conditional payments. It allows the creation, management, and automation of escrow contracts, providing security for both payers and payees. This API can be used across various industries including e-commerce, SaaS, real estate, freelance marketplaces, and more.

### Key API Functions:

* **Create and manage escrow contracts:** Users can set up payment agreements with specific conditions that must be met before funds are released.
* **Real-time status updates:** The API provides real-time access to escrow statuses, allowing users to verify the state of funds at any time. (Working)

### REST API Advantages:

* **Transparency:** Every transaction is recorded on the blockchain, making it auditable and ensuring that all parties can track the flow of funds.
* **Low Costs:** Built on Stellar, the API benefits from minimal transaction fees compared to traditional solutions or even other blockchain platforms.
* **Speed:** Stellar's fast transaction finality ensures that payments are processed almost in real-time.
* **Cross-chain compatibility:** With USDC and Circle’s cross-chain transfer protocol, the API can operate across multiple blockchains, offering flexibility to businesses.

### API Use Cases

1. **Freelance marketplaces:** Freelance platforms can use the API to manage milestone-based payments, enhancing trust and reducing disputes between clients and freelancers.
2. **High-value e-commerce:** In peer-to-peer transactions, escrow ensures that payment is only released once the product has been received and verified.
3. **SaaS providers:** Platforms managing recurring payments can leverage the API to release payments upon successful service delivery.
4. **International real estate:** Trustless Work helps secure funds in cross-border real estate transactions by releasing them only when all legal and contractual obligations are met.
5. **Legal services:** Law firms can manage complex multi-party agreements or settlements without needing manual escrow services.

In summary, the Trustless Work REST API provides a robust, transparent, and cost-effective solution for managing escrowed funds, catering to a wide range of industries and promoting security and trust in digital transactions.



Production API

> https://api.trustlesswork.com

Dev API

> https://dev.api.trustlesswork.com

## <mark style="color:orange;">Warning!</mark>

> You'll have <mark style="color:red;">**50**</mark> as a request rate limit per client in the API every 60 seconds.

## GitHub Repository

{% embed url="https://github.com/Trustless-Work" %}

## API Swagger

{% embed url="https://dev.api.trustlesswork.com/docs" %}

##
