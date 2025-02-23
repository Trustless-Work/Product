import { NextRequest, NextResponse } from 'next/server';
import StellarSdk from 'stellar-sdk';
import { handleApiError } from '@/lib/errorHandler';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export async function POST(request: NextRequest) {
    try {
        const { address } = await request.json();

        // Validate address format
        if (!address || !address.startsWith('G') || address.length !== 56) {
            return NextResponse.json(
                { error: 'Invalid Stellar address' },
                { status: 400 }
            );
        }

        // Load the account and check for trustline
        const account = await server.loadAccount(address);
        
        const hasTrustline = account.balances.some(
            (balance: { asset_type: string; asset_code?: string; asset_issuer?: string; }) => 
                balance.asset_type !== 'native' && 
                balance.asset_code === process.env.NEXT_PUBLIC_TOKEN_SYMBOL &&
            balance.asset_issuer === process.env.STELLAR_ISSUER_PUBLIC_KEY
        );

        return NextResponse.json({ hasTrustline });

    } catch (error: unknown) {
        return handleApiError(error);
    }
}