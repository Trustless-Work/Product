import StellarSdk from 'stellar-sdk';
import * as dotenv from 'dotenv';
import type { Asset, Keypair } from 'stellar-sdk';

// Load environment variables
dotenv.config();

// Configure Stellar network settings
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// Token configuration from environment variables
const TOKEN_CONFIG = {
    name: process.env.NEXT_PUBLIC_TOKEN_NAME,
    symbol: process.env.NEXT_PUBLIC_TOKEN_SYMBOL,
    totalSupply: '1000000000', // 1 billion tokens
};

/**
 * Creates a trustline from the distribution account to the issuing account.
 * This is necessary before the distributor can receive the tokens.
 */
async function createTrustline(
    distributorKeypair: Keypair,
    asset: Asset
): Promise<void> {
    try {
        console.log('Creating trustline...');
        
        // Load the distributor's account
        const account = await server.loadAccount(distributorKeypair.publicKey());
        
        // Build the trustline transaction
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.changeTrust({
                asset: asset,
                limit: TOKEN_CONFIG.totalSupply // Set the maximum amount the account can hold
            }))
            .setTimeout(30)
            .build();

        // Sign and submit the transaction
        transaction.sign(distributorKeypair);
        await server.submitTransaction(transaction);
        
        console.log('✅ Trustline created successfully');
    } catch (error) {
        console.error('Error creating trustline:', error);
        throw error;
    }
}

/**
 * Issues the initial supply of tokens from the issuing account to the distribution account
 */
async function issueTokens(
    issuerKeypair: Keypair,
    distributorPublicKey: string,
    asset: Asset
): Promise<void> {
    try {
        console.log('Issuing tokens...');
        
        // Load the issuer's account
        const account = await server.loadAccount(issuerKeypair.publicKey());
        
        // Build the payment transaction for initial token issuance
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: distributorPublicKey,
                asset: asset,
                amount: TOKEN_CONFIG.totalSupply
            }))
            .setTimeout(30)
            .build();

        // Sign and submit the transaction
        transaction.sign(issuerKeypair);
        await server.submitTransaction(transaction);
        
        console.log('✅ Tokens issued successfully');
    } catch (error) {
        console.error('Error issuing tokens:', error);
        throw error;
    }
}

/**
 * Main function to create and configure the token
 */
async function createToken(): Promise<void> {
    try {
        // Validate environment variables
        if (!process.env.STELLAR_ISSUER_SECRET_KEY || !process.env.STELLAR_DISTRIBUTOR_SECRET_KEY) {
            throw new Error('Missing required environment variables');
        }

        console.log('Starting token creation process...');
        
        // Create keypairs from secret keys
        const issuerKeypair = StellarSdk.Keypair.fromSecret(
            process.env.STELLAR_ISSUER_SECRET_KEY
        );
        const distributorKeypair = StellarSdk.Keypair.fromSecret(
            process.env.STELLAR_DISTRIBUTOR_SECRET_KEY
        );

        // Create the asset object that represents our token
        const asset = new StellarSdk.Asset(
            TOKEN_CONFIG.symbol,
            issuerKeypair.publicKey()
        );

        // Step 1: Create trustline from distributor to issuer
        await createTrustline(distributorKeypair, asset);

        // Step 2: Issue initial token supply to distributor
        await issueTokens(issuerKeypair, distributorKeypair.publicKey(), asset);

        // Log success and token information
        console.log('\n🎉 Token created successfully!');
        console.log('\nToken Information:');
        console.log('------------------');
        console.log(`Name: ${TOKEN_CONFIG.name}`);
        console.log(`Symbol: ${TOKEN_CONFIG.symbol}`);
        console.log(`Issuer: ${issuerKeypair.publicKey()}`);
        console.log(`Total Supply: ${TOKEN_CONFIG.totalSupply}`);
        console.log(`Distribution Account: ${distributorKeypair.publicKey()}`);
        
    } catch (error) {
        console.error('❌ Token creation failed:', error);
        throw error;
    }
}

createToken()
    .then(() => {
        console.log('\n✨ Token setup completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Token setup failed:', error);
        process.exit(1);
    });