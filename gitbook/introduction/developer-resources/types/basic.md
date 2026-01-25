---
icon: square-small
---

# Basic

### Status, baseURL and HttpMethos

```typescript
/**
 * The base URL for the Trustless Work API
 */
export type baseURL =
  | "https://api.trustlesswork.com"
  | "https://dev.api.trustlesswork.com";

/**
 * Escrow Type
 */
export type EscrowType = "single-release" | "multi-release";

/**
 * Http Method
 */
export type HttpMethod = "get" | "post" | "put" | "delete";

/**
 * Unique possible statuses for a Trustless Work request
 */
export type Status = "SUCCESS" | "FAILED";

/**
 * Date
 */
export type Date = {
  _seconds: number;
  _nanoseconds: number;
};

```
