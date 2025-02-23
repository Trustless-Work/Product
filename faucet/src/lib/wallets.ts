import albedo from "@albedo-link/intent";

export interface WalletInfo {
    id: string;
    name: string;
    icon: string;
    disabled?: boolean;
    checkAvailability: () => boolean;
    sign: (xdr: string) => Promise<{ signedXdr: string }>;
  }
  
  declare global {
    interface Window {
      albedo?: {
        tx: (opts: { xdr: string, network: string }) => Promise<{ signed_envelope_xdr: string }>;
      };
    }
    interface Window {
        freighterApi?: {
          isConnected: () => Promise<boolean>;
          getAddress: () => Promise<{ address: string }>;
          signTransaction: (
            transactionXdr: string,
            opts?: { networkPassphrase?: string; address?: string }
          ) => Promise<{ xdr: string }>;
          requestAccess: () => Promise<boolean>;
        };
      }    
  }

  export const WALLETS: WalletInfo[] = [
    {
      id: 'freighter',
      name: 'Freighter',
      icon: '/images/freighter.png',
      checkAvailability: () => typeof window !== 'undefined' && !!window.freighterApi,
      sign: async (xdr: string) => {
        try{
            const signed = await window.freighterApi!.signTransaction(xdr, {
            networkPassphrase: "Test SDF Network ; September 2015"
            });

            const signedXDR = (signed as { signedTxXdr?: string; xdr?: string }).signedTxXdr || signed.xdr;
            return { signedXdr: signedXDR || signed.xdr };
        }
        catch(error){
            console.log('freighter sign error:', error);
            throw error;            
        }
      }
    },
    {
      id: "albedo",
      name: "Albedo",
      icon: "/images/albedo.png",
      checkAvailability: () => true,
      sign: async (xdr) => {
        try {
          const result = await albedo.tx({
            xdr,
            network: "testnet",
          });
          return { signedXdr: result.signed_envelope_xdr };
        } catch (error) {
          console.log("Albedo sign error:", error);
          throw error;
        }
      },
    },
  ];