import { EscrowAdapter } from './escrow.adapter.interface';

export class V1Adapter implements EscrowAdapter {
  version = 'v1';
  normalizeReleasePayload(payload: any) {
    return {
      milestone_id: payload.milestoneId,
      amount: payload.amount,
    };
  }
  async invokeRelease(contractAddress: string, normalized: any): Promise<string> {
    return `v1-tx-${contractAddress.slice(0,8)}-${Date.now()}`;
  }
}
