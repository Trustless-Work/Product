import React, { FC } from "react";
import { TokenWithChainDetails } from "@allbridge/bridge-core-sdk/dist/src/tokens-info/tokens-info.model";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { FeePaymentMethod } from "@allbridge/bridge-core-sdk/dist/src/models";

interface SummaryProps {
  sourceToken?: TokenWithChainDetails;
  destinationToken?: TokenWithChainDetails;
  amount: string;
  receivedAmount: string;
  paymentMethod: FeePaymentMethod;
  sourceAccount?: string;
  destinationAccount?: string;
  send: () => Promise<void>;
  txId?: string;
}

const Summary: FC<SummaryProps> = ({
  amount,
  receivedAmount,
  paymentMethod,
  sourceToken,
  destinationToken,
  sourceAccount,
  destinationAccount,
  send,
  txId,
}) => {
  return (
    <Card>
      {txId && <Alert severity="success">{txId}</Alert>}
      <Grid container columnSpacing={2} rowGap={0} rowSpacing={0}>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              From
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sourceToken?.chainName} {sourceToken?.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sender account: {sourceAccount}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              To
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {destinationToken?.chainName} {destinationToken?.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Recipient account: {destinationAccount}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Source amount
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {amount}$
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Destination amount
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {receivedAmount}$
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      <CardActions>
        <Button onClick={send} size="large">
          Send
        </Button>
      </CardActions>
    </Card>
  );
};

export default Summary;
