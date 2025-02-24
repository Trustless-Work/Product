import { Injectable } from '@nestjs/common';
import { Transaction, Keypair, xdr } from '@stellar/stellar-sdk';
import { SignTransactionDto, SignedTransactionResponse } from './signer.dto';

@Injectable()
export class SignerService {
  async signTransaction(
    signTransactionDto: SignTransactionDto,
  ): Promise<SignedTransactionResponse> {
    const { unsignedXDR, signers } = signTransactionDto;

    // Decode the XDR transaction
    let transaction: Transaction;
    try {
      transaction = new Transaction(unsignedXDR, 'base64');
    } catch (error) {
      throw new Error('Invalid XDR format');
    }

    // Sign the transaction with each provided secret key
    signers.forEach(({ secretKey }) => {
      const keypair = Keypair.fromSecret(secretKey);
      transaction.sign(keypair);
    });

    // Return the signed XDR transaction
    return {
      signedTransaction: transaction.toXDR(),
    };
  }
}
