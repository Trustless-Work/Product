import {SolanaWalletProvider} from './models';
import {ChainSymbol, ChainType, RawBridgeSolanaTransaction} from '@allbridge/bridge-core-sdk';
import {PublicKey, SendOptions, Transaction, TransactionSignature, VersionedTransaction} from '@solana/web3.js';

interface PhantomWallet {
    isPhantom?: boolean;
    publicKey?: PublicKey;
    isConnected: boolean;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signAndSendTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T,
        options?: SendOptions
    ): Promise<{ signature: TransactionSignature }>;
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}

declare global {
    interface Window {
        solana: PhantomWallet;
    }
}

class SolanaWallet implements SolanaWalletProvider {
    chainType = ChainType.SOLANA as const;
    chainSymbol = ChainSymbol.SOL;

    async connect(): Promise<string | undefined> {
        await window.solana.connect();
        return window.solana?.publicKey?.toBase58();
    }

    async signAndSendTransaction(rawTransaction: RawBridgeSolanaTransaction): Promise<string> {
        const { signature } = await window.solana.signAndSendTransaction(rawTransaction);
        return signature;
    }
}

export default SolanaWallet;
