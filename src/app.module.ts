import { Module } from '@nestjs/common';
import { EscrowModule } from './escrow/escrow.module';
import { ContractVersionModule } from './contract-version/contract-version.module';

@Module({
  imports: [ContractVersionModule, EscrowModule],
})
export class AppModule {}
