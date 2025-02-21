# **Trustless Work Smart Escrow – User Guide**  

The **Trustless Work Smart Escrow** system supports two types of escrows:  

1. **Time-Based Escrow** – Milestones auto-approve once their deadline is reached.  
2. **Manual Escrow** – Requires **explicit approval** from the approver.  

---

## **🚀 Features**

✅ **Milestone-Based Fund Release** – Funds are released **only when all milestones are approved**.  
✅ **Supports Time-Based & Manual Escrows** – Choose between automatic or manual approvals.  
✅ **Dispute Handling** – Funds are locked until disputes are resolved.  

---

## **Setting Up an Escrow**

To create an escrow, use the `initialize_escrow` function.

### **🔹 Required Parameters**

| Field               | Type               | Description |
|--------------------|-----------------|-------------|
| `engagement_id`     | `String`          | Unique ID for the escrow contract. |
| `title`            | `String`          | Name of the escrow contract. |
| `description`      | `String`          | Description of the engagement. |
| `approver`         | `Address`         | Address of the approver who verifies milestones. |
| `service_provider` | `Address`         | Address of the service provider receiving the funds. |
| `platform_address` | `Address`         | Address of the platform managing the escrow. |
| `amount`           | `i128`            | Total amount locked in escrow. |
| `platform_fee`     | `i128`            | Platform fee deducted from the escrow. |
| `milestones`       | `Vec<Milestone>`  | List of milestones (**different structure for manual & time-based escrows**). |
| `release_signer`   | `Address`         | Address authorized to release funds. |
| `dispute_resolver` | `Address`         | Address of the dispute resolver. |
| `dispute_flag`     | `bool`            | Indicates if the escrow is in dispute. |
| `release_flag`     | `bool`            | Indicates if the funds have been released. |
| `resolved_flag`    | `bool`            | Indicates if the escrow has been resolved. |
| `trustline`        | `Address`         | Address managing the escrow balance. |
| `escrow_type`      | `EscrowType`      | Either `TimeBased` or `Manual`. |

---

## **Milestone Structure**

Each **milestone** represents a phase in the escrow contract.  

- **Time-based milestones have an `approval_deadline`** and **auto-approve** when the deadline is met.  
- **Manual milestones require a two-step approval process.**  

### **🔹 Milestone Fields**

| Field               | Type       | Description |
|---------------------|-----------|-------------|
| `description`       | `String`   | Description of the milestone. |
| `status`           | `String`   | Status of the milestone (e.g., "Pending", "Completed"). |
| `approved_flag`    | `bool`     | `true` if the milestone is approved. |
| `approval_deadline` | `Option<u64>` | *(Only for `TimeBased` escrows)* The UNIX timestamp when the milestone auto-approves. |

### **🔹 Example Milestones**

#### **Time-Based Milestone**

```rust
Milestone {
    description: "Design Phase".to_string(),
    status: "Pending".to_string(),
    approved_flag: false,
    approval_deadline: Some(e.ledger().timestamp() + 3600), // Auto-approves after 1 hour
}
```

#### **Manual Milestone**

```rust
Milestone {
    description: "Development Phase".to_string(),
    status: "Pending".to_string(),
    approved_flag: false, // Must be updated manually
    approval_deadline: None, // Not allowed for manual escrows
}
```

---

## **Approval Process**

### **🔹 Manual Escrow Approval**

1. **Escrow Creator Marks Milestone as Completed**  

   ```rust
   hange_milestone_status(e: Env, milestone_index: i128, new_status: String, service_provider: Address);
   ```

2. **Approver Confirms & Sets `approved_flag = true`**  

   ```rust
   change_milestone_flag(e: Env, milestone_index: i128, new_flag: bool, approver: Address,);
   ```

3. **Funds can be released once all milestones are approved.**  

✅ **Manual milestones must be explicitly approved before fund release.**  
❌ **They cannot have an `approval_deadline`.**  

---

### **🔹 Time-Based Escrow Approval**

1. **Each milestone is auto-approved when `e.ledger().timestamp() >= approval_deadline`.**  
2. **No manual approval required.**  
3. **Funds are released when all milestones are approved.**  

✅ **Milestones auto-approve once the deadline is reached.**  
✅ **No action is needed from the approver.**  

#### **🔹 Check Milestone Approval Status**

To verify if an milestone is approved:

```rust
MilestoneManager::is_milestone_approved(&e, &escrow.escrow_type, &milestone)
```

This function ensures **all milestones** have either:

- ✅ Passed their deadline (auto-approved), or  
- ✅ Were already manually approved.

---

## **Releasing Funds**

Funds are **released automatically** when:
✔ **All milestones are approved.**  
✔ **No disputes are active (`dispute_flag = false`).**  
✔ **The escrow owner or release signer initiates the release.**

### **🔹 Example Release Call**

```rust
distribute_escrow_earnings(e: Env, release_signer: Address, trustless_work_address: Address)
```

---

## **Dispute Handling**

If a dispute is raised (`dispute_flag = true`), **funds cannot be released** until a **dispute resolver** intervenes.

### **🔹 How to Raise a Dispute**

```rust
change_dispute_flag(e: Env);
```

### **🔹 How to Resolve a Dispute**

The `dispute_resolver` can manually approve or reject milestones.

```rust
resolving_disputes(
  e: Env,
  dispute_resolver: Address,
  approver_funds: i128,
  service_provider_funds: i128,
  trustless_work_address: Address
)
```

---

## **🛑 Common Errors**

| Error Code | Description |
|------------|-------------|
| `TimeBasedEscrowRequiresApprovalDeadline` | Every milestone in a **time-based escrow** **must** have an `approval_deadline`. |
| `ManualEscrowCannotHaveApprovalDeadline` | **Manual escrows cannot have approval deadlines.** |
| `ApprovalDeadlineCannotBeInPast` | A milestone’s `approval_deadline` **must be in the future** when creating an escrow. |
| `EscrowNotCompleted` | Funds cannot be released until **all milestones are approved**. |

---
