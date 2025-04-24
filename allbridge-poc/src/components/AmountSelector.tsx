import React, { FC } from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";

interface FeePaymentMethodSelectorProps {
  amount: string;
  handleChangeAmount: (amount: string) => void;
}

const AmountSelector: FC<FeePaymentMethodSelectorProps> = ({
  amount,
  handleChangeAmount,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Amount
        </Typography>
        <TextField
          label="Enter amount"
          variant="outlined"
          value={amount}
          onChange={(event) => handleChangeAmount(event.target.value)}
          fullWidth
          type="number" // Optional: restrict input to numbers
          inputProps={{ min: 0 }} // Optional: prevent negative values
        />
      </CardContent>
    </Card>
  );
};

export default AmountSelector;
