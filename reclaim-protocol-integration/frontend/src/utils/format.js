import BigNumber from "bignumber.js";
import { keccak256 } from "@ethersproject/keccak256";
import { Buffer } from "buffer";

// used for display purposes
export const truncateString = (str) =>
  str ? `${str.slice(0, 5)}…${str.slice(-5)}` : "";

// conversion used to display the base fee
export const stroopToXlm = (
  stroops,
) => {
  if (stroops instanceof BigNumber) {
    return stroops.dividedBy(1e7);
  }
  return new BigNumber(Number(stroops) / 1e7);
};

export const xlmToStroop = (lumens) => {
  if (lumens instanceof BigNumber) {
    return lumens.times(1e7);
  }
  // round to nearest stroop
  return new BigNumber(Math.round(Number(lumens) * 1e7));
};

// With a tokens set number of decimals, display the formatted value for an amount.
// Example - User A has 1000000001 of a token set to 7 decimals, display should be 100.0000001
export const formatTokenAmount = (amount, decimals) => {
  let formatted = amount.toString();

  if (decimals > 0) {
    formatted = amount.shiftedBy(-decimals).toFixed(decimals).toString();

    // Trim trailing zeros
    while (formatted[formatted.length - 1] === "0") {
      formatted = formatted.substring(0, formatted.length - 1);
    }

    if (formatted.endsWith(".")) {
      formatted = formatted.substring(0, formatted.length - 1);
    }
  }

  return formatted;
};

export const getRecId = (signature) => {
  const rec = signature.slice(-2)
  const recId = parseInt(rec, 16) - 27;
  return recId;
}

export const formatSignature = (signature) => {
  return signature
    .substring(1, 130)
    .substring(1, 130);
}

export const getSerializedClaim = (proof) => {
  return proof.signedClaim.claim.identifier +
    "\n" +
    proof.signedClaim.claim.owner +
    "\n" +
    proof.signedClaim.claim.timestampS +
    "\n" +
    proof.signedClaim.claim.epoch;
}

export const getHash = (serializedClaim) => {
  let ethPrefix = "\x19Ethereum Signed Message:\n";
  ethPrefix = ethPrefix + serializedClaim.length;

  const message = ethPrefix + serializedClaim;
  let digest = keccak256(Buffer.from(message));

  digest = digest.substring(2);
  return Buffer.from(digest, "hex");
}