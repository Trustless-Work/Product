export interface EscrowAdapter {
  version: string;
  normalizeReleasePayload(payload: any): any;
  invokeRelease(contractAddress: string, normalized: any): Promise<string>;
}
