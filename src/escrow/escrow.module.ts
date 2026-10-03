import { Module } from '@nestjs/common';
import { EscrowController } from './escrow.controller';
import { EscrowService } from './escrow.service';
import { AdapterFactory } from './adapters/adapter.factory';
import { ContractVersionModule } from '../contract-version/contract-version.module';

@Module({
  imports: [ContractVersionModule],
  controllers: [EscrowController],
  providers: [EscrowService, AdapterFactory],
})
export class EscrowModule {}
