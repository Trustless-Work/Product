import { Injectable } from '@nestjs/common';

type ContractMeta = { version: string; deployedAt: string };

@Injectable()
export class ContractVersionService {
  private registry = new Map<string, ContractMeta>();

  constructor() {
    this.registry.set('CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', { version: 'v1', deployedAt: '2024-01-01' });
    this.registry.set('CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', { version: 'v2', deployedAt: '2025-06-01' });
  }

  getVersion(contractAddress: string): string {
    const meta = this.registry.get(contractAddress);
    if (!meta) throw new Error(`Contract ${contractAddress} not registered`);
    return meta.version;
  }

  register(contractAddress: string, version: string) {
    this.registry.set(contractAddress, { version, deployedAt: new Date().toISOString() });
  }
}
