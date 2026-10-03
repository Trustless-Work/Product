import { Claim } from "../../models/claim.model";
import { Chain, ChainId } from "../../models/chain.model";
import { EscrowAttestationActaSchema } from "../../schemas";
import {
  BaseClaimProcessor,
  ExecuteResult,
} from "./base.claim.processor";

export class EscrowAttestationActaClaimProcessor extends BaseClaimProcessor {
  constructor() {
    super("escrow-attestation-acta", EscrowAttestationActaSchema);
  }

  async execute(claim: Claim): Promise<ExecuteResult> {
    const chainId = claim.chains?.[0]?.id as ChainId | undefined;
    if (chainId !== ChainId.BASE) {
      throw new Error(
        `Chain not supported: ${chainId}. Only ${ChainId.BASE} is supported for this claim.`
      );
    }

    const { attestations, transactionHash, escrowContract, actorAddress } =
      claim.data;

    if (!this.isEvmAddress(escrowContract)) {
      throw new Error("Invalid escrow contract address");
    }

    if (!this.isEvmAddress(actorAddress)) {
      throw new Error("Invalid actor address");
    }

    if (!this.isValidTransactionHash(transactionHash)) {
      throw new Error("Invalid transaction hash format");
    }

    for (const attestation of attestations) {
      if (!this.isEvmAddress(attestation.attester)) {
        throw new Error(`Invalid attester address: ${attestation.attester}`);
      }
      if (!this.isEvmAddress(attestation.attestedAddress)) {
        throw new Error(
          `Invalid attested address: ${attestation.attestedAddress}`
        );
      }
      const ts = Number(attestation.timestamp);
      if (!Number.isFinite(ts) || ts <= 0) {
        throw new Error("Invalid timestamp in attestation");
      }
      if (
        !attestation.signature ||
        typeof attestation.signature !== "string"
      ) {
        throw new Error(`Invalid signature in attestation`);
      }
      if (
        !attestation.statement ||
        typeof attestation.statement !== "string"
      ) {
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
