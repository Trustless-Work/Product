import { Injectable } from '@nestjs/common';
import { EscrowAdapter } from './escrow.adapter.interface';
import { V1Adapter } from './v1.adapter';
import { V2Adapter } from './v2.adapter';

@Injectable()
export class AdapterFactory {
  private adapters = new Map<string, EscrowAdapter>();

  constructor() {
    this.adapters.set('v1', new V1Adapter());
    this.adapters.set('v2', new V2Adapter());
  }

  create(version: string): EscrowAdapter {
    const adapter = this.adapters.get(version);
    if (!adapter) throw new Error(`No adapter for version ${version}`);
    return adapter;
  }
}
