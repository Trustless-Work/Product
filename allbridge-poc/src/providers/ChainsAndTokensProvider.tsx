import React, {createContext, useEffect, useState} from 'react';
import {getChains} from '../services/sdk';
import {ChainDetailsWithTokens} from '@allbridge/bridge-core-sdk';

interface ChainsAndTokensContextI {
    chains: ChainDetailsWithTokens[],
}

const defaultValue: ChainsAndTokensContextI = {
    chains: []
}

export const ChainsAndTokensContext = createContext<ChainsAndTokensContextI>(defaultValue);

interface Props {
    children: React.ReactNode;
}

const ChainsAndTokensProvider: React.FC<Props> = ({children}) => {
    const [chains, setChains] = useState<ChainDetailsWithTokens[]>(defaultValue.chains);


    const loadChainDetailsMap = async (): Promise<void> => {
        setChains(await getChains());
    }
    useEffect(() => {
        loadChainDetailsMap();
    }, []);

    return <ChainsAndTokensContext.Provider value={{chains}}>
        {children}
    </ChainsAndTokensContext.Provider>;
};

export default ChainsAndTokensProvider;
