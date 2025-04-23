import {ChainSymbol, ChainType, RawTronTransaction} from '@allbridge/bridge-core-sdk';
import {TronWalletProvider} from './models';
// @ts-expect-error import tron
import TronWeb from 'tronweb';

interface TronLinkParams {
    request: (args: any) => any;
    tronWeb: TronWeb;
}

declare global {
    interface Window {
        tronLink: TronLinkParams;
    }
}

class TronWallet implements TronWalletProvider {
    chainType = ChainType.TRX as const;
    tronWeb = this._tronLink.tronWeb;
    chainSymbol = ChainSymbol.TRX;

    private get _tronLink(): TronLinkParams {
        return window.tronLink;
    }

    async connect(): Promise<string | undefined> {
        await this._tronLink.request({method: 'tron_requestAccounts'});
        return this.tronWeb.defaultAddress.base58 || undefined;
    }

    async signAndSendTransaction(rawTransaction: RawTronTransaction): Promise<string> {
        const signedTx = await this.tronWeb.trx.sign(rawTransaction);
        const res = await this.tronWeb.trx.sendRawTransaction(signedTx);
        return res.transaction.txID;
    }
}

export default TronWallet;
