import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StressTestConfig, StressTestResult, RequestResult } from './common.types';

@Injectable()
export class CommonService {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(protected configService: ConfigService) {}

  /**
   * Base method to run a stress test. Should be implemented by specific endpoint services.
   */
  async runStressTest(config: StressTestConfig): Promise<StressTestResult> {
    throw new Error('Method not implemented in base class. Use endpoint-specific implementation.');
  }

  /**
   * Processes test results and generates a summary
   */
  protected processResults(results: RequestResult[], startTime: Date, endTime: Date): StressTestResult {
    const totalDuration = endTime.getTime() - startTime.getTime();
    
    // Count successes and failures
    const successfulRequests = results.filter(r => r.success).length;
    const failedRequests = results.length - successfulRequests;
    
    // Calculate response times
    const responseTimes = results.map(r => r.responseTime);
    const averageResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / results.length;
    const minResponseTime = Math.min(...responseTimes);
    const maxResponseTime = Math.max(...responseTimes);
    
    // Count status codes
    const statusCodes = results.reduce((counts, result) => {
      if (result.statusCode) {
        counts[result.statusCode] = (counts[result.statusCode] || 0) + 1;
      }
      return counts;
    }, {} as Record<number, number>);
    
    // Count errors
    const errors = results.reduce((counts, result) => {
      if (result.error) {
        counts[result.error] = (counts[result.error] || 0) + 1;
      }
      return counts;
    }, {} as Record<string, number>);
    
    // Calculate requests per second
    const requestsPerSecond = results.length / (totalDuration / 1000);
    
    return {
      startTime,
      endTime,
      totalDuration,
      totalRequests: results.length,
      successfulRequests,
      failedRequests,
      averageResponseTime,
      minResponseTime,
      maxResponseTime,
      requestsPerSecond,
      statusCodes,
      errors,
      results,
    };
  }

  /**
   * Splits the requests into batches for controlled execution
   */
  protected createBatches(total: number, batchSize: number): number[][] {
    const batches: number[][] = [];
    let currentBatch: number[] = [];

    for (let i = 1; i <= total; i++) {
      currentBatch.push(i);
      if (currentBatch.length === Number(batchSize) || i === Number(total)) {
        batches.push([...currentBatch]);
        currentBatch = [];
      }
    }
    return batches;
  }
}