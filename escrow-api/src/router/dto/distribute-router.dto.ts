export class DistributeRouterDto {
  routerContractId: string;
  reason: string;
  sourceEscrowId?: string;
  idempotencyKey?: string;
}
