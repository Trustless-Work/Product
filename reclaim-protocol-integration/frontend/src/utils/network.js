


export const TESTNET_DETAILS = {
  network: "TESTNET",
  networkUrl: "https://horizon-testnet.stellar.org",
  networkPassphrase: "Test SDF Network ; September 2015",
};

export const signTx = async (
  xdr,
  publicKey,
  kit,
) => {
  const { signedXDR } = await kit.sign({
    xdr,
    publicKey,
  });
  return signedXDR;
};