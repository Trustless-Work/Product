import { Injectable } from '@nestjs/common';
import { ContractVersionService } from '../contract-version/contract-version.service';
import { AdapterFactory } from './adapters/adapter.factory';

@Injectable()
export class EscrowService {
  constructor(
    private readonly versionService: ContractVersionService,
    private readonly adapterFactory: AdapterFactory,
  ) {}

  getContractVersion(contractAddress: string) {
    return this.versionService.getVersion(contractAddress);
  }

  async releaseFunds(contractAddress: string, payload: any) {
    const version = this.versionService.getVersion(contractAddress);
    const adapter = this.adapterFactory.create(version);
    const normalized = adapter.normalizeReleasePayload(payload);
    const txHash = await adapter.invokeRelease(contractAddress, normalized);
    return { contractAddress, version, normalized, txHash };
  }
}
