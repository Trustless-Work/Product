---
description: >-
  This endpoint allows a trustline to be established on the Stellar blockchain
  specifically for the USDC token issued by Circle on the user's account.
icon: scribble
---

# Set Trustline

### What is it for?

In Stellar, before a token such as Circle's USDC can be received and stored, an account must establish a trustline with the issuer of the asset. This endpoint facilitates that process in an automated fashion.

**Note:** This endpoint should not necessarily work in main.

### **Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |



### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/helper/set-trustline" method="post" %}
[Broken link](broken-reference)
{% endopenapi-operation %}
