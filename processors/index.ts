import { ActaClaimProcessor } from "./acta.claim.processor";
import { IdentityClaimProcessor } from "./identity.claim.processor";
import { OkrsClaimProcessor } from "./okrs.claim.processor";
import { SocialScoreClaimProcessor } from "./social-score.claim.processor";
import { EscrowAttestationActaClaimProcessor } from "./escrow-attestation-acta.claim.processor";

export const processors = [
  new ActaClaimProcessor(),
  new IdentityClaimProcessor(),
  new OkrsClaimProcessor(),
  new SocialScoreClaimProcessor(),
  new EscrowAttestationActaClaimProcessor(),
];

export {
  ActaClaimProcessor,
  IdentityClaimProcessor,
  OkrsClaimProcessor,
  SocialScoreClaimProcessor,
  EscrowAttestationActaClaimProcessor,
};
