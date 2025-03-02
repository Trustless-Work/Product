import { Plugin } from "@elizaos/core";
import { signStellarTransaction } from "./actions/index.ts"
import { stellarXDREvluator } from "./evaluators/index.ts"

export const stellarPlugin: Plugin = {
  name: "Stellar Plugin",
  description: "signs unsigned stellar transactions",
  actions: [signStellarTransaction],
  evaluators: [stellarXDREvluator],
  providers: [],
};
