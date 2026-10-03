import { Claim } from "../../models/claim.model";
import { Chain, ChainId } from "../../models/chain.model";
import { EscrowAttestationActaSchema } from "../../schemas";
import {
  BaseClaimProcessor,
  ExecuteResult,
} from "../../processors/base.claim.processor";
import { Address, parseAbi } from "viem";

export class EscrowAttestationActaClaimProcessor extends BaseClaimProcessor {
  constructor() {
    super("escrow-attestation-acta", EscrowAttestationActaSchema);
  }

  async execute(claim: Claim): Promise<ExecuteResult> {
    const chainId = claim.chains[0]?.id as ChainId;
    if (chainId !== ChainId.BASE) {
      throw new Error("Chain not supported: only Base is supported for this claim");
    }

    const { attestations, transactionHash, escrowContract, actorAddress } =
      claim.data;

    // Validate escrow contract
    if (!this.isEvmAddress(escrowContract)) {
      throw new Error("Invalid escrow contract address");
    }

    // Validate actor address
    if (!this.isEvmAddress(actorAddress)) {
      throw new Error("Invalid actor address");
    }

    // Validate transaction hash format
    if (!this.isValidTransactionHash(transactionHash)) {
      throw new Error("Invalid transaction hash format");
    }

    // Validate each attestation has required fields
    for (const attestation of attestations) {
      if (!this.isEvmAddress(attestation.attester)) {
        throw new Error(`Invalid attester address: ${attestation.attester}`);
      }
      if (!this.isEvmAddress(attestation.attestedAddress)) {
        throw new Error(`Invalid attested address: ${attestation.attestedAddress}`);
      }
      if (!attestation.timestamp || !Number.isFinite(Number(attestation.timestamp))) {
        throw new Error(`Invalid timestamp in attestation`);
      }
      if (!attestation.signature || typeof attestation.signature !== "string") {
        throw new Error(`Invalid signature in attestation`);
      }
      if (!attestation.statement || typeof attestation.statement !== "string") {
        throw new Error(`Invalid statement in attestation`);
      }
    }

    return {
      success: true,
      message: "Claim validated successfully",
      data: {
        transactionHash,
        escrowContract,
        actorAddress,
        attestationsCount: attestations.length,
      },
    };
  }
}
