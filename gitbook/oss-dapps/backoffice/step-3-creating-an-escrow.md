# Step 3: Creating an Escrow

{% embed url="https://youtu.be/p7DZWAfewwc" %}

**1. Navigate to the Escrows Section**

* Click on **"Escrows"** in the **sidebar**.
* This will take you to the **"Initiated Escrows"** tab.

<figure><img src="../../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>

* **Escrow tabs** are organized by **role** (Approver, Service Provider, Dispute Resolver, etc.).
  * If you don’t see any escrows, it means your wallet **hasn't been assigned a role yet**.

📌 **Tip:** If you want to understand roles in escrows, refer to the [Roles in Escrow Design section.](../../introduction/technology-overview/roles-in-trustless-work.md)

***

**2. Click "Create Escrow"**

* This starts the **Escrow Initialization Flow**.

<figure><img src="../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

***

**3. Fill in Escrow Details**

To configure an escrow, you need to **define roles** and **key parameters**:

✅ **Title** → Name your escrow.\
✅ **Description** → A summary of the contract.\
✅ **Approver** → Who approves milestone completion.\
✅ **Service Provider** → The person/entity delivering the service/product.\
✅ **Engagement** → A unique ID (e.g., invoice, contract, project ID).\
✅ **Platform Address** → The platform receiving fees and modifying milestones.\
✅ **Amount** → The total amount locked in escrow.\
✅ **Release Signer** → The entity that releases funds.\
✅ **Dispute Resolver** → Handles disputes if needed.\
✅ **Milestones** → Conditions that must be completed & approved.

🔹 _Make sure you **know the wallet addresses** that will play each role before proceeding!_

➡️ **Click "Initialize Escrow" once all details are set.**

<figure><img src="../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

***

**4. Sign the Transaction**

* Your **wallet (Freighter, Albedo, etc.)** will prompt you to confirm and sign the transaction.
* This **deploys the escrow contract** on **Stellar Testnet**.
* Once signed, the escrow is now **active**.

<figure><img src="../../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

***

**5. Escrow Successfully Initialized!**

* You will receive a **confirmation pop-up** with:
  * The **Escrow ID**.
  * A link to view the escrow on **Stellar Explorer**.

✅ Your escrow will now be **visible in the "Initiated Escrows" tab**!\
If you used the **same wallet for all roles**, it will appear across **all tabs**.

<figure><img src="../../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

#### **🚀 Next Steps:**

🔹 **Try creating another escrow with multiple addresses** by opening a **Testnet wallet in incognito mode!**\
🔹 **Proceed to the Funding Phase** – Learn how to deposit funds into your escrow.
