import {
    AllbridgeCoreSdk,
    ChainSymbol,
    GasFeeOptions,
    Messenger,
    NodeRpcUrls, SendParams,
    TokenWithChainDetails
} from '@allbridge/bridge-core-sdk';
import {ChainDetailsWithTokens} from '@allbridge/bridge-core-sdk';
import {
    RawBridgeSolanaTransaction,
    RawEvmTransaction, RawSorobanTransaction,
    RawTronTransaction
} from '@allbridge/bridge-core-sdk/dist/src/services/models';
import type Web3 from 'web3';
// @ts-expect-error import tron
import TronWeb from 'tronweb';

const SDK_NODE_URLS: NodeRpcUrls = {
    [ChainSymbol.SOL]: 'https://api.mainnet-beta.solana.com',
    [ChainSymbol.TRX]: 'https://tron-rpc.publicnode.com',
    [ChainSymbol.SRB]: 'https://rpc.ankr.com/stellar_soroban',
    [ChainSymbol.STLR]: 'https://horizon.stellar.org',
};

export const sdk = new AllbridgeCoreSdk(SDK_NODE_URLS);

export const getChains = async (): Promise<ChainDetailsWithTokens[]> => {
    return Object.values(await sdk.chainDetailsMap());
}
export const getAmountToBeReceived = async (amount: string,
                                            sourceToken: TokenWithChainDetails,
                                            destinationToken: TokenWithChainDetails): Promise<string> => {
    return sdk.getAmountToBeReceived(amount, sourceToken, destinationToken, Messenger.ALLBRIDGE);
}
export const getGasFeeOptions = async (sourceToken: TokenWithChainDetails,
                                       destinationToken: TokenWithChainDetails): Promise<GasFeeOptions> => {
    return sdk.getGasFeeOptions(sourceToken, destinationToken, Messenger.ALLBRIDGE);
}

export const getRawTransactionForEvm = async (params: SendParams, web3: Web3): Promise<RawEvmTransaction> => {
    return await sdk.bridge.rawTxBuilder.send(params, web3) as RawEvmTransaction;
}
export const getRawTransactionForTron = async (params: SendParams, tronWeb: TronWeb): Promise<RawTronTransaction> => {
    return await sdk.bridge.rawTxBuilder.send(params, tronWeb) as RawTronTransaction;
}
export const getRawTransactionForSolana = async (params: SendParams): Promise<RawBridgeSolanaTransaction> => {
    return await sdk.bridge.rawTxBuilder.send(params) as RawBridgeSolanaTransaction;
}
export const getRawTransactionForStellar = async (params: SendParams): Promise<RawSorobanTransaction> => {
    return await sdk.bridge.rawTxBuilder.send(params) as RawSorobanTransaction;
}
