import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EscrowService } from './escrow.service';

@ApiTags('escrow')
@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post(':contractAddress/release')
  @ApiOperation({ summary: 'Release funds - version aware adapter' })
  async release(@Param('contractAddress') contractAddress: string, @Body() body: any) {
    return this.escrowService.releaseFunds(contractAddress, body);
  }

  @Get(':contractAddress/version')
  @ApiOperation({ summary: 'Get registered contract version' })
  getVersion(@Param('contractAddress') contractAddress: string) {
    return { contractAddress, version: this.escrowService.getContractVersion(contractAddress) };
  }
}
