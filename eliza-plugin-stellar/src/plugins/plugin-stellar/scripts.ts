import * as StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.rpc.Server('https://horizon-testnet.stellar.org');

async function createUnsignedTransaction() {
  const sourceAccount = new StellarSdk.Account('GDNH64DRUT4CY3UJLWQIB655PQ6OG34UGYB4NC5DC4TYWLNJIBCEYTTD', '2319149195853854');

  // Build the transaction
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
  })
    .addOperation(StellarSdk.Operation.payment({
      destination: 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR',
      asset: StellarSdk.Asset.native(),  // XLM
      amount: '1'  // 1 XLM
    }))
    .setTimeout(30)
    .build();

  // Return the unsigned transaction XDR
  console.log("UNSIGNED TX: ", transaction.toXDR());
  const unsignedXdr = transaction.toXDR();

  const tx = new StellarSdk.Transaction(unsignedXdr,
    StellarSdk.Networks.TESTNET);

  // Load the signer's private key
  const signerKeypair = StellarSdk.Keypair.fromSecret(
    process.env.STELLAR_SECRET_KEY);

  // Sign the transaction
  tx.sign(signerKeypair);
  
  console.log("SIGNED TX: ", tx.toXDR());

  // const keypair = StellarSdk.Keypair.random();
  // await server.requestAirdrop(keypair.publicKey());
  // var pubAddress = keypair.publicKey(); 
  // var privateAddress = keypair.secret();
  // var canSign = keypair.canSign();

  // console.log("public key: ", pubAddress);
  // console.log("private key: ", privateAddress);
  // console.log("can sign: ", canSign);
}

createUnsignedTransaction()
// AAAAAgAAAADaf3BxpPgsboldoID7vXw842+UNgPGi6MXJ4stqUBETAAAAGQAAAAAAAAAAgAAAAEAAAAAAAAAAAAAAABnwyrKAAAAAAAAAAEAAAAAAAAAAQAAAAAQfdFrLDgzSIIugR73qs8U0ZiKbwBUclTTPh5thlbgnAAAAAAAAAAAAJiWgAAAAAAAAAAA