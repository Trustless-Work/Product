import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SignerService } from './signer.service';
import { SignTransactionDto, SignedTransactionResponse } from './signer.dto';

@Controller('signer')
export class SignerController {
  constructor(private readonly signerService: SignerService) {}

  @Post('sign')
  async signTransaction(
    @Body() signTransactionDto: SignTransactionDto,
  ): Promise<SignedTransactionResponse> {
    try {
      return await this.signerService.signTransaction(signTransactionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
