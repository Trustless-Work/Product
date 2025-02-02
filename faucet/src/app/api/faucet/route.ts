import { NextRequest, NextResponse } from 'next/server';
import StellarSdk from 'stellar-sdk';

// Initialize Stellar server connection
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// Create asset configuration using environment variables
const asset = new StellarSdk.Asset(
    process.env.NEXT_PUBLIC_TOKEN_SYMBOL!,
    process.env.STELLAR_ISSUER_PUBLIC_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const { address, amount } = await request.json();

        // Input validation
        if (!address || !amount) {
            return NextResponse.json(
                { error: 'Address and amount are required' },
                { status: 400 }
            );
        }

        // Validate Stellar address format
        if (!address.startsWith('G') || address.length !== 56) {
            return NextResponse.json(
                { error: 'Invalid Stellar address format' },
                { status: 400 }
            );
        }

        // Load distributor account
        const distributorKeypair = StellarSdk.Keypair.fromSecret(
            process.env.STELLAR_DISTRIBUTOR_SECRET_KEY!
        );
        const distributorAccount = await server.loadAccount(distributorKeypair.publicKey());

        // Create and submit the payment transaction
        const transaction = new StellarSdk.TransactionBuilder(distributorAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: address,
                asset: asset,
                amount: amount.toString()
            }))
            .setTimeout(30)
            .build();

        transaction.sign(distributorKeypair);
        await server.submitTransaction(transaction);

        return NextResponse.json({
            success: true,
            message: `Successfully sent ${amount} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL} tokens`
        });

    } catch (error: any) {
        // Handle specific Stellar errors
        if (error.response?.data?.extras?.result_codes?.operations?.[0] === 'op_no_trust') {
            return NextResponse.json(
                { error: 'No trustline established for this token' },
                { status: 400 }
            );
        }

        console.error('Distribution error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to distribute tokens' },
            { status: 500 }
        );
    }
}