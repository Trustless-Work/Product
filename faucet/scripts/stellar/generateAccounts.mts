import StellarSdk from 'stellar-sdk';
import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname }  from 'path';
import * as path from 'path';
import type { StellarAccount, StellarAccounts } from './types';

/**
 * Creates a new Stellar account pair and funds it using Friendbot (testnet only)
 * @returns Promise<StellarAccount> The created and funded account
 */
async function createAndFundAccount(): Promise<StellarAccount> {
    // Generate a new random keypair
    const account = StellarSdk.Keypair.random();
    
    try {
        // Fund the account using Friendbot (testnet only)
        const response = await fetch(
            `https://friendbot.stellar.org?addr=${account.publicKey()}`
        );
        
        if (!response.ok) {
            throw new Error(`Failed to fund account: ${response.statusText}`);
        }

        return {
            publicKey: account.publicKey(),
            secretKey: account.secret()
        };
    } catch (error) {
        console.error('Error funding account:', error);
        throw error;
    }
}

/**
 * Generates and funds both issuer and distributor accounts
 * @returns Promise<StellarAccounts> Both accounts' credentials
 */
async function generateStellarAccounts(): Promise<StellarAccounts> {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    console.log('Starting account generation process...');
    
    try {
        // Create both accounts in parallel for efficiency
        const [issuer, distributor] = await Promise.all([
            createAndFundAccount(),
            createAndFundAccount()
        ]);

        const accounts: StellarAccounts = {
            issuer,
            distributor
        };

        // Create a timestamp for the filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        // Save the account information to a file
        await fs.writeFile(
            path.join(__dirname, `stellar-accounts-${timestamp}.json`),
            JSON.stringify(accounts, null, 2)
        );

        // Generate the .env content
        const envContent = `
            # Stellar Account Configuration
            # Generated on: ${new Date().toISOString()}
            # Network: Testnet

            # Issuer Account (keeps these secure!)
            STELLAR_ISSUER_PUBLIC_KEY=${issuer.publicKey}
            STELLAR_ISSUER_SECRET_KEY=${issuer.secretKey}

            # Distributor Account (keeps these secure!)
            STELLAR_DISTRIBUTOR_PUBLIC_KEY=${distributor.publicKey}
            STELLAR_DISTRIBUTOR_SECRET_KEY=${distributor.secretKey}
            `;

        // Save the .env.example content
        await fs.writeFile(
            path.join(__dirname, '../../.env.example'),
            envContent.trim()
        );

        console.log('✨ Accounts generated successfully!');
        console.log('📝 Account details saved to stellar-accounts file');
        console.log('🔒 .env.example file updated with new account structure');
        
        return accounts;
    } catch (error) {
        console.error('Failed to generate accounts:', error);
        throw error;
    }
}

generateStellarAccounts()
    .then(accounts => {
        console.log('\nAccount Details:');
        console.log('---------------');
        console.log('Issuer Public Key:', accounts.issuer.publicKey);
        console.log('Distributor Public Key:', accounts.distributor.publicKey);
        console.log('\n⚠️  IMPORTANT: Save the secret keys securely!');
        process.exit(0);
    })
    .catch(error => {
        console.error('Script failed:', error);
        process.exit(1);
    });