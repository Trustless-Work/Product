import {EvmWalletProvider} from './models';
import {ChainSymbol, ChainType, RawEvmTransaction} from '@allbridge/bridge-core-sdk';
import Web3 from 'web3';
import {AbstractProvider} from 'web3-core';
import {toChecksumAddress} from 'web3-utils';
import {Buffer} from "buffer";

window.Buffer = window.Buffer || Buffer;

declare global {
    interface Window {
        ethereum: AbstractProvider;
    }
}

class EvmWallet implements EvmWalletProvider {
    chainType = ChainType.EVM as const;
    web3 = new Web3(this._ethereum);

    constructor(public chainSymbol: ChainSymbol) {
    }

    private get _ethereum(): AbstractProvider {
        if (!window.ethereum) {
            throw new Error('Provider not found');
        }
        return window.ethereum;
    }

    async connect(): Promise<string | undefined> {
        const accounts: string[] = await this._ethereum.request?.({
            method: 'eth_requestAccounts',
        });

        return toChecksumAddress(accounts[0]);
    }

    async signAndSendTransaction(rawTransaction: RawEvmTransaction): Promise<string> {
        const gas = await this.web3.eth.estimateGas(rawTransaction);
        // @ts-ignore
        const feeOptions: { maxPriorityFeePerGas: string | number | undefined, maxFeePerGas: string | number | undefined } = {maxPriorityFeePerGas: null, maxFeePerGas: null};
        const signedTx = await this.web3.eth.sendTransaction({...rawTransaction, gas, ...feeOptions});
        return signedTx.transactionHash;
    }
}

export default EvmWallet;
