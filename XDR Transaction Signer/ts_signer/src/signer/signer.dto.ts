import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SignerKeyPair {
  @IsString()
  @IsNotEmpty()
  publicKey: string;

  @IsString()
  @IsNotEmpty()
  secretKey: string;
}

export class SignTransactionDto {
  @IsString()
  @IsNotEmpty()
  unsignedXDR: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SignerKeyPair)
  signers: SignerKeyPair[];
}

export class SignedTransactionResponse {
  @IsString()
  @IsNotEmpty()
  signedTransaction: string;
}
