import React, { FC, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ConnectionContext } from "../providers/ConnectionProvider/ConnectionProvider";
import { TokenWithChainDetails } from "@allbridge/bridge-core-sdk/dist/src/tokens-info/tokens-info.model";

interface AccountsProps {
  selectedSourceToken?: TokenWithChainDetails;
}

const Accounts: FC<AccountsProps> = ({ selectedSourceToken }) => {
  const { account, connect, disconnect } = useContext(ConnectionContext);

  const handleConnect = async (): Promise<void> => {
    if (selectedSourceToken) {
      await connect(selectedSourceToken.chainSymbol);
    }
  };

  const displayAddress =
    account || "0x1234...ABCD (connect wallet to get actual address)";

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            Accounts
          </Typography>
          {account ? (
            <Button onClick={disconnect} variant="text">
              Disconnect
            </Button>
          ) : (
            <Button onClick={handleConnect} variant="text">
              Connect
            </Button>
          )}
        </Stack>

        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="source-account"
              disabled
              value={displayAddress}
              label="Sender Address"
              fullWidth
              variant="outlined"
              multiline
              minRows={1}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Accounts;
