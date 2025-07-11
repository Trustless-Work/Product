---
description: The best way to manage some errors.
icon: bug
---

# Error Handling

## Overview

With these methods, we check axios, wallet and other errors in the Trustless Work requests.

## Enums

Types of errors.

```typescript
/**
 * Types for Error types
 */
export enum ApiErrorTypes {
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  WALLET_ERROR = "WALLET_ERROR",
}

```

## Handle Errors

Throw the errors in the expected way.

```typescript
import axios from "axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { ApiErrorTypes } from "../enums/error.enum";
import { ErrorResponse, WalletError } from "@/@types/errors.entity";

export const handleError = (error: AxiosError | WalletError): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    const code = axiosError.response?.status || 500;
    const message = axiosError.response?.data?.message || error.message;
    return {
      message,
      code,
      type: mapStatusCodeToErrorType(code),
    };
  } else if (error.code === -4) {
    return {
      message: "Wallet was closed before transaction was sent",
      code: -4,
      type: ApiErrorTypes.WALLET_ERROR,
    };
  } else {
    return {
      message: error.message,
      code: 500,
      type: ApiErrorTypes.UNKNOWN_ERROR,
    };
  }
};

const mapStatusCodeToErrorType = (code: number): ApiErrorTypes => {
  switch (code) {
    case 404:
      return ApiErrorTypes.NOT_FOUND;
    case 401:
      return ApiErrorTypes.UNAUTHORIZED;
    default:
      return ApiErrorTypes.UNKNOWN_ERROR;
  }
};

```
