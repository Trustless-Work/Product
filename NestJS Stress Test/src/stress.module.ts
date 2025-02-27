import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DeployerService } from './endpoints/deployer.service';

@Module({
  providers: [
    CommonService,
    DeployerService,
  ],
  exports: [DeployerService],
})
export class StressModule {}