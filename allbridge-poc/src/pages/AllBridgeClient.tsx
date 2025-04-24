import React, { useContext, useEffect, useState } from "react";
import ChainsAndTokens from "../components/ChainsAndTokens";
import { Divider, Grid, Box } from "@mui/material";
import {
  ChainDetailsWithTokens,
  TokenWithChainDetails,
} from "@allbridge/bridge-core-sdk/dist/src/tokens-info/tokens-info.model";
import { ChainsAndTokensContext } from "../providers/ChainsAndTokensProvider";
import {
  FeePaymentMethod,
  Messenger,
} from "@allbridge/bridge-core-sdk/dist/src/models";
import Summary from "../components/Summary";
import FeePaymentMethodSelector from "../components/FeePaymentMethodSelector";
import {
  getAmountToBeReceived,
  getGasFeeOptions,
  getRawTransactionForEvm,
  getRawTransactionForSolana,
  getRawTransactionForTron,
} from "../services/sdk";
import Big from "big.js";
import {
  ChainType,
  GasFeeOptions,
  SendParams,
  ChainSymbol,
} from "@allbridge/bridge-core-sdk";
import Accounts from "../components/Accounts";
import { ConnectionContext } from "../providers/ConnectionProvider/ConnectionProvider";

type ResponsiveDrawerProps = {
  destination: string;
  amount: string;
};

function AllbridgeClient({
  destination,
  amount: propAmount,
}: ResponsiveDrawerProps) {
  const { chains } = useContext(ChainsAndTokensContext);
  const { account, disconnect, walletProvider } = useContext(ConnectionContext);
  const [sourceToken, setSourceToken] = useState<TokenWithChainDetails>();
  const [destinationToken, setDestinationToken] =
    useState<TokenWithChainDetails>();
  const [paymentMethod, setPaymentMethod] = useState<FeePaymentMethod>(
    FeePaymentMethod.WITH_NATIVE_CURRENCY
  );
  const [amount, setAmount] = useState<string>(propAmount);
  const [receivedAmount, setReceivedAmount] = useState<string>("0");
  const [gasFeeOptions, setGasFeeOptions] = useState<GasFeeOptions>();
  const [fee, setFee] = useState<string>("0");
  const [destinationAccount, setDestinationAccount] = useState<
    string | undefined
  >(destination);
  const [txId, setTxId] = useState<string | undefined>();

  const setDefaultTokens = (chains: ChainDetailsWithTokens[]): void => {
    const defaultSourceToken = chains?.[0]?.tokens?.[0];

    const stellarChain = chains.find(
      (chain) => chain.chainSymbol === ChainSymbol.SRB
    );

    const defaultDestToken = stellarChain?.tokens.find(
      (tokenInfo) => tokenInfo.symbol === "USDC"
    );

    if (defaultSourceToken) {
      setSourceToken(defaultSourceToken);
    }

    if (defaultDestToken) {
      setDestinationToken(defaultDestToken);
    } else {
      console.warn("USDC on Stellar not found in token list.");
    }
  };

  const loadGasFeeOptions = async (
    sourceToken: TokenWithChainDetails,
    destinationToken: TokenWithChainDetails
  ): Promise<void> => {
    setGasFeeOptions(await getGasFeeOptions(sourceToken, destinationToken));
  };

  const calcReceivedAmount = async (
    amount: string,
    sourceToken: TokenWithChainDetails,
    destinationToken: TokenWithChainDetails
  ): Promise<void> => {
    const amountWithoutFee = Big(amount)
      .minus(fee)
      .round(sourceToken.decimals)
      .toFixed();
    setReceivedAmount(
      Big(amountWithoutFee).gt(0)
        ? await getAmountToBeReceived(
            amountWithoutFee,
            sourceToken,
            destinationToken
          )
        : "0"
    );
  };

  const send = async (): Promise<void> => {
    setTxId(undefined);
    if (!walletProvider) {
      return;
    }
    const params: SendParams = getParams();
    let txId;
    switch (walletProvider.chainType) {
      case ChainType.EVM: {
        const rawTransaction = await getRawTransactionForEvm(
          params,
          walletProvider.web3
        );
        txId = await walletProvider.signAndSendTransaction(rawTransaction);
        break;
      }
      case ChainType.SOLANA: {
        const rawTransaction = await getRawTransactionForSolana(params);
        txId = await walletProvider.signAndSendTransaction(rawTransaction);
        break;
      }
      case ChainType.TRX: {
        const rawTransaction = await getRawTransactionForTron(
          params,
          walletProvider.tronWeb
        );
        txId = await walletProvider.signAndSendTransaction(rawTransaction);
        break;
      }
    }
    setTxId(txId);
  };

  const getParams = (): SendParams => {
    if (
      !sourceToken ||
      !destinationToken ||
      !amount ||
      !account ||
      !destinationAccount
    ) {
      throw new Error("Missing required parameters.");
    }
    return {
      sourceToken,
      destinationToken,
      amount,
      fromAccountAddress: account,
      toAccountAddress: destinationAccount,
      messenger: Messenger.ALLBRIDGE,
      gasFeePaymentMethod: paymentMethod,
    };
  };

  useEffect(() => {
    if (chains.length) {
      setDefaultTokens(chains);
    }
  }, [chains]);

  useEffect(() => {
    if (sourceToken && destinationToken) {
      loadGasFeeOptions(sourceToken, destinationToken);
    } else {
      setGasFeeOptions(undefined);
    }
    if (sourceToken?.chainSymbol !== walletProvider?.chainSymbol) {
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceToken, destinationToken]);

  useEffect(() => {
    if (!gasFeeOptions) {
      setFee("0");
    } else {
      setFee(gasFeeOptions[paymentMethod]?.float || "0");
    }
  }, [paymentMethod, gasFeeOptions]);

  useEffect(() => {
    if (!amount || !sourceToken || !destinationToken) {
      setReceivedAmount("0");
      return;
    }
    calcReceivedAmount(amount, sourceToken, destinationToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fee]);

  return (
    <Box className="Main">
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={12}>
          <ChainsAndTokens
            title="Source token"
            chains={chains}
            selectedToken={sourceToken}
            handleSelectedTokenChange={setSourceToken}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Accounts selectedSourceToken={sourceToken} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FeePaymentMethodSelector
            selectedPaymentMethod={paymentMethod}
            handleChangePaymentMethod={setPaymentMethod}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 2, mt: 2 }} />

      <Summary
        amount={amount}
        receivedAmount={receivedAmount}
        paymentMethod={paymentMethod}
        sourceToken={sourceToken}
        destinationToken={destinationToken}
        sourceAccount={account}
        destinationAccount={destinationAccount}
        send={send}
        txId={txId}
      />
    </Box>
  );
}

export default AllbridgeClient;
