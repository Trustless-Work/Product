import { NextRequest, NextResponse } from 'next/server';
import StellarSdk from 'stellar-sdk';
import { handleApiError } from '@/lib/errorHandler';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export async function POST(request: NextRequest) {
    try {
        const { address } = await request.json();

        // Create the asset object
        const asset = new StellarSdk.Asset(
            process.env.NEXT_PUBLIC_TOKEN_SYMBOL!,
            process.env.STELLAR_ISSUER_PUBLIC_KEY!
        );

        // Load the user's account
        const userAccount = await server.loadAccount(address);

        // Build the change trust operation
        const transaction = new StellarSdk.TransactionBuilder(userAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.changeTrust({
                asset: asset
            }))
            .setTimeout(300)
            .build();

        // Generate the XDR format of the transaction
        const xdr = transaction.toXDR();

        return NextResponse.json({
            success: true,
            xdr: xdr,
            message: 'Transaction prepared. Please sign and submit using your wallet.'
        });
    } catch (error: unknown) {
        return handleApiError(error);
    }
}