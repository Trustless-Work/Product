import { Module } from '@nestjs/common';
import { ContractVersionService } from './contract-version.service';

@Module({
  providers: [ContractVersionService],
  exports: [ContractVersionService],
})
export class ContractVersionModule {}
