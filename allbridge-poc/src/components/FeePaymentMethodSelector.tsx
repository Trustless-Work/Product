import React, {FC} from 'react';
import {Card, CardContent, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import {FeePaymentMethod} from '@allbridge/bridge-core-sdk';

interface FeePaymentMethodSelectorProps {
    selectedPaymentMethod?: FeePaymentMethod;
    handleChangePaymentMethod: (paymentMethod: FeePaymentMethod) => void
}

const FeePaymentMethodSelector: FC<FeePaymentMethodSelectorProps> = ({selectedPaymentMethod, handleChangePaymentMethod}) => {
    return <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">Fee payment method</Typography>
            <ToggleButtonGroup
                color="primary"
                value={selectedPaymentMethod}
                exclusive
                onChange={(event, value) => handleChangePaymentMethod(value)}
                aria-label="Platform"
            >
                <ToggleButton value="native">Native</ToggleButton>
                <ToggleButton value="stablecoin">Stablecoin</ToggleButton>
            </ToggleButtonGroup>
        </CardContent>
    </Card>
}

export default FeePaymentMethodSelector;
