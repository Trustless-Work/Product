import { EscrowAdapter } from './escrow.adapter.interface';

export class V2Adapter implements EscrowAdapter {
  version = 'v2';
  normalizeReleasePayload(payload: any) {
    return {
      milestone_id: payload.milestoneId,
      amount: payload.amount,
      note: payload.note ?? '',
      recipient: payload.recipient ?? null,
    };
  }
  async invokeRelease(contractAddress: string, normalized: any): Promise<string> {
    return `v2-tx-${contractAddress.slice(0,8)}-${Date.now()}`;
  }
}
