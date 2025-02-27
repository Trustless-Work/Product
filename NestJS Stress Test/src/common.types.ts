export interface StressTestConfig {
    concurrentRequests: number;
    totalRequests: number;
    delayBetweenBatches?: number; // ms
    headers?: Record<string, string>;
  }
  
  export interface DeployerRequestBody {
    signer: string;
    engagementId: string;
    title: string;
    description: string;
    approver: string;
    serviceProvider: string;
    platformAddress: string;
    amount: string;
    platformFee: string;
    milestones: Array<{
      description: string;
      status: string;
      approved_flag: boolean;
    }>;
    releaseSigner: string;
    disputeResolver: string;
  }
  
  export interface DeployerResponse {
    unsignedTransaction: string;
    [key: string]: any;
  }
  
  export interface RequestResult {
    id: number;
    success: boolean;
    responseTime: number; // ms
    error?: string;
    statusCode?: number;
    response?: any;
  }
  
  export interface StressTestResult {
    startTime: Date;
    endTime: Date;
    totalDuration: number; // ms
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number; // ms
    minResponseTime: number; // ms
    maxResponseTime: number; // ms
    requestsPerSecond: number;
    statusCodes: Record<number, number>;
    errors: Record<string, number>;
    results: RequestResult[];
  }
  
  export class RunStressTestDto {
    concurrentRequests?: number;
    totalRequests?: number;
    delayBetweenBatches?: number;
    headers?: Record<string, string>;
  }