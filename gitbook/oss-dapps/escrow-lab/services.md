---
description: >-
  We set a unique and generic service in order to interact with Trustless Work
  API.
icon: server
---

# Services

## Overview

In order to have a good quality and clean code, we've generated a generic service which interacts with Trustless Work.



## Generic Escrow Service

Every response and payload are completely typed with the entities that we had defined before.

```typescript
import http from "@/config/axios";
import { AxiosError } from "axios";
import { signTransaction } from "../../auth/helpers/stellar-wallet-kit.helper";
import { handleError } from "@/errors/utils/handle-errors";
import { WalletError } from "@/@types/errors.entity";
import { kit } from "@/config/wallet-kit";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { EscrowPayloadService } from "@/@types/escrows/escrow-payload.entity";
import { Escrow } from "@/@types/escrows/escrow.entity";
import { HttpMethod } from "@/@types/http.entity";

// Interface defining the required properties for escrow service operations
interface EscrowServiceProps<T extends EscrowPayloadService> {
  payload: T;
  endpoint: string;
  method: HttpMethod;
  requiresSignature?: boolean;
  returnEscrowDataIsRequired?: boolean;
}

/**
 * EscrowService class handles all escrow-related operations
 * including transaction signing and sending to the Stellar network
 */
export class EscrowService {
  private static instance: EscrowService;

  private constructor() {}

  /**
   * Get singleton instance of EscrowService
   */
  public static getInstance(): EscrowService {
    if (!EscrowService.instance) {
      EscrowService.instance = new EscrowService();
    }
    return EscrowService.instance;
  }

  /**
   * Handle GET requests that don't require signature
   */
  private async handleGetRequest<T extends EscrowPayloadService>(
    endpoint: string,
    payload: T
  ): Promise<EscrowRequestResponse> {
    const { data } = await http.get<EscrowRequestResponse>(endpoint, {
      params: payload,
    });
    return data;
  }

  /**
   * Get wallet address for transaction signing
   */
  private async getWalletAddress(): Promise<string> {
    const { address } = await kit.getAddress();
    return address;
  }

  /**
   * Sign transaction using wallet
   */
  private async signTransactionWithWallet(
    unsignedTransaction: string,
    address: string
  ): Promise<string> {
    // Sign the transaction using the Stellar Wallet Kit
    return await signTransaction({ unsignedTransaction, address });
  }

  /**
   * Send signed transaction to the network
   */
  private async sendSignedTransaction(
    signedXdr: string,
    returnEscrowDataIsRequired: boolean
  ): Promise<EscrowRequestResponse> {
    const tx = await http.post("/helper/send-transaction", {
      signedXdr,
      returnEscrowDataIsRequired,
    });
    return tx.data;
  }

  /**
   *
   * Main method to handle escrow operations
   *
   * @Reference URL: https://surli.cc/rlyqso
   *
   * @Flow:
   * 1. Get wallet address
   * 2. Make initial request to get [unsigned transaction]
   * 3. [Sign transaction] with wallet
   * 4. Send [signed transaction] to the network
   * 5. Return [escrow data]
   *
   * @Note:
   * - This method handles both GET and POST requests
   * - It also handles the signing of transactions
   * - It returns the escrow data if required
   * - It handles both HTTP and Wallet errors
   *
   */
  public async execute<T extends EscrowPayloadService>({
    payload,
    endpoint,
    method,
    requiresSignature = true,
    returnEscrowDataIsRequired = true,
  }: EscrowServiceProps<T>): Promise<EscrowRequestResponse | Escrow> {
    try {
      // Handle GET requests that don't require signature
      if (!requiresSignature && method === "get") {
        return await this.handleGetRequest(endpoint, payload);
      }

      // Get wallet address and make initial request
      const address = await this.getWalletAddress();
      const response = await http[method]<EscrowRequestResponse>(
        endpoint,
        payload
      );

      const { unsignedTransaction } = response.data;

      // Validate that we received an unsigned transaction
      if (!unsignedTransaction) {
        throw new Error("No unsigned transaction received from the server");
      }

      // Sign and send transaction
      const signedTxXdr = await this.signTransactionWithWallet(
        unsignedTransaction,
        address
      );

      // Send the signed transaction to the network
      return await this.sendSignedTransaction(
        signedTxXdr,
        returnEscrowDataIsRequired
      );
    } catch (error: unknown) {
      const mappedError = handleError(error as AxiosError | WalletError);
      console.error("Error:", mappedError.message);
      throw new Error(mappedError.message);
    }
  }
}

// Export a singleton instance for easy access
export const escrowService = EscrowService.getInstance();

```



This service will be used in the custom hooks where we send submits with the forms adapted to each Trustless Work endpoint.

