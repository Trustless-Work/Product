export interface StellarAccount {
    publicKey: string;
    secretKey: string;
}

export interface StellarAccounts {
    issuer: StellarAccount;
    distributor: StellarAccount;
}