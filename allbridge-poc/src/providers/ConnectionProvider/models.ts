import {
    ChainSymbol,
    ChainType,
    RawBridgeSolanaTransaction,
    RawEvmTransaction, RawSorobanTransaction,
    RawTransaction, RawTronTransaction
} from '@allbridge/bridge-core-sdk';
import Web3 from 'web3';
// @ts-expect-error import tron
import TronWeb from 'tronweb';

export interface WalletProvider<T extends RawTransaction> {
    chainType: ChainType;
    chainSymbol: ChainSymbol;
    connect: () => Promise<string | undefined>;
    signAndSendTransaction: (rawTransaction: T) => Promise<string>;
}

export interface EvmWalletProvider extends WalletProvider<RawEvmTransaction> {
    chainType: ChainType.EVM;
    web3: Web3;
}

export interface SolanaWalletProvider extends WalletProvider<RawBridgeSolanaTransaction> {
    chainType: ChainType.SOLANA;
}

export interface TronWalletProvider extends WalletProvider<RawTronTransaction> {
    chainType: ChainType.TRX;
    tronWeb: TronWeb;
}

export interface StellarWalletProvider extends WalletProvider<RawSorobanTransaction> {
    chainType: ChainType.SRB;
}
