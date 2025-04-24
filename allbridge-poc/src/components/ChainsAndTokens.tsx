import React, { FC, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import {
  ChainDetailsWithTokens,
  TokenWithChainDetails,
} from "@allbridge/bridge-core-sdk/dist/src/tokens-info/tokens-info.model";

interface ChainsAndTokensProps {
  title: string;
  chains: ChainDetailsWithTokens[];
  selectedToken?: TokenWithChainDetails;
  handleSelectedTokenChange: (token: TokenWithChainDetails) => void;
}

const ChainsAndTokens: FC<ChainsAndTokensProps> = ({
  title,
  chains,
  selectedToken,
  handleSelectedTokenChange,
}) => {
  const [selectedChain, setSelectedChain] =
    useState<ChainDetailsWithTokens | null>(null);

  const handleChainChange = (event: SelectChangeEvent<string>) => {
    const chain = chains.find((c) => c.chainSymbol === event.target.value);
    setSelectedChain(chain || null);
  };

  const handleTokenChange = (event: SelectChangeEvent<string>) => {
    const token = selectedChain?.tokens.find(
      (t) => t.name === event.target.value
    );
    if (token) {
      handleSelectedTokenChange(token);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="chain-select-label">Select Chain</InputLabel>
              <Select
                labelId="chain-select-label"
                value={selectedChain ? selectedChain.chainSymbol : ""}
                onChange={handleChainChange}
                label="Select Chain"
              >
                {chains.map((chain) => (
                  <MenuItem key={chain.chainSymbol} value={chain.chainSymbol}>
                    {chain.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              disabled={!selectedChain}
            >
              <InputLabel id="token-select-label">Select Token</InputLabel>
              <Select
                labelId="token-select-label"
                value={selectedToken ? selectedToken.name : ""}
                onChange={handleTokenChange}
                label="Select Token"
              >
                {selectedChain?.tokens.map((token) => (
                  <MenuItem key={token.name} value={token.name}>
                    {token.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChainsAndTokens;
