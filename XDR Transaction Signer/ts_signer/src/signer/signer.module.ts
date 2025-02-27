import { Module } from '@nestjs/common';
import { SignerController } from './signer.controller';
import { SignerService } from './signer.service';

@Module({
  controllers: [SignerController],
  providers: [SignerService],
})
export class SignerModule {}
