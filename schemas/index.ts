import { BaseSchema } from "./base.schema";
import { IdentitySchema } from "./identity.schema";
import { OkrsSchema } from "./okrs.schema";
import { SocialScoreSchema } from "./social-score.schema";
import { ActaSchema } from "./acta.schema";
import { EscrowAttestationActaSchema } from "./escrow-attestation-acta.schema";

export const schemas = {
  acta: ActaSchema,
  identity: IdentitySchema,
  okr: OkrsSchema,
  socialScore: SocialScoreSchema,
  escrowAttestationActa: EscrowAttestationActaSchema,
};

export {
  BaseSchema,
  IdentitySchema,
  OkrsSchema,
  SocialScoreSchema,
  ActaSchema,
  EscrowAttestationActaSchema,
};
