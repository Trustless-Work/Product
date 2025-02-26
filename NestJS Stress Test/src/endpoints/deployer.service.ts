import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  StressTestConfig,
  StressTestResult,
  DeployerRequestBody,
  DeployerResponse,
  RequestResult
} from '../common.types';
import { CommonService } from '../common.service';
import { Keypair, Networks, TransactionBuilder, Horizon, Transaction } from '@stellar/stellar-sdk';

@Injectable()
export class DeployerService extends CommonService {

  constructor(
    configService: ConfigService
  ) {
    super(configService);
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.configService.get<string>('TRUSTLESS_API_KEY') || ''}`,
    };
  }

  /**
   * Run stress test on the deployer endpoint
   */
  async runStressTest(config: StressTestConfig): Promise<StressTestResult> {
    this.logger.log(`Starting stress test on deployer endpoint with ${config.concurrentRequests} concurrent requests`);
    const endpoint = this.configService.get<string>('DEPLOYER_ENDPOINT') || 
      'https://dev.api.trustlesswork.com/deployer/invoke-deployer-contract';
      
    const results: RequestResult[] = [];
    const startTime = new Date();

    try {
      const batches = this.createBatches(config.totalRequests, config.concurrentRequests);      

      for (const [batchIndex, batch] of batches.entries()) {
        this.logger.log(`Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} requests)`);
        
        const batchPromises = batch.map(id => this.executeDeployerRequest(endpoint, id));
        const batchResults = await Promise.all(batchPromises);
        
        results.push(...batchResults);
        
        if (config.delayBetweenBatches && batchIndex < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, config.delayBetweenBatches));
        }
      }
    } catch (error) {
      this.logger.error(`Error during stress test: ${error.message}`, error.stack);
    }

    const endTime = new Date();
    const testResult = this.processResults(results, startTime, endTime);
    
    this.logger.log(`Stress test completed. Success rate: ${(testResult.successfulRequests / testResult.totalRequests * 100).toFixed(2)}%`);
    
    return testResult;
  }

  /**
   * Execute a single request to the deployer endpoint
   */
  private async executeDeployerRequest(endpoint: string, id: number): Promise<RequestResult> {
    const start = Date.now();
    let result: RequestResult = {
      id,
      success: false,
      responseTime: 0,
    };

    try {
      const requestBody = this.createRequestBody(id);
      const headers = this.getHeaders();
      const response = await axios.post<DeployerResponse>(endpoint, requestBody, { headers });
      
      result.statusCode = response.status;
      
      if (response.data?.unsignedTransaction) {
        try {
          const signedXdr = await this.signTransaction(response.data.unsignedTransaction, id);
          
          await this.submitTransaction(signedXdr);
          
          result.success = true;
          result.response = { unsignedTransaction: response.data.unsignedTransaction, signedXdr };
        } catch (error) {
          result.error = `Error with the transaction: ${error.message}`;
        }
      } else {
        result.error = 'Response did not contain unsignedTransaction';
      }
    } catch (error) {
      result.success = false;
      result.statusCode = error.response?.status;
      result.error = error.response?.data?.message || error.message;
    } finally {
      result.responseTime = Date.now() - start;
    }

    return result;
  }

  /**
   * Sign a transaction using Stellar SDK
   */
  private async signTransaction(unsignedTransaction: string, id: number): Promise<string> {
    try {
      const secretKey = this.configService.get<string>('STELLAR_SECRET_KEY_'+ id);
      if (!secretKey) {
        throw new Error('STELLAR_SECRET_KEY not configured');
      }

      const keypair = Keypair.fromSecret(secretKey);
      
      const network = this.configService.get<string>('STELLAR_NETWORK') === 'public' 
        ? Networks.PUBLIC 
        : Networks.TESTNET;
      
      const transaction = TransactionBuilder.fromXDR(unsignedTransaction, network);
      
      transaction.sign(keypair);
      
      return transaction.toXDR();      
    } catch (error) {
      this.logger.error(`Error signing transaction: ${error.message}`);
      throw error;
    }
  }

  /**
   * Submit a transaction using Stellar SDK
   */  
  private async submitTransaction(signedXdr: string) {
    try {
      const stellarServer = this.configService.get<string>('STELLAR_SERVER');
      if (!stellarServer) {
        throw new Error('STELLAR_SERVER not configured');
      }      
      const server = new Horizon.Server(stellarServer);   

      const transaction = new Transaction(signedXdr, Networks.TESTNET);      
      const response = await server.submitTransaction(transaction);

      return response;
    } catch (error) {
      this.logger.error(`Error submitting transaction: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create a request body for the deployer endpoint
   */
  private createRequestBody(id: number): DeployerRequestBody {
    return {
      signer: this.configService.get<string>('STELLAR_PUBLIC_KEY_' + id) || 
        "GDZHRK2UZHZAXSSXZAJRO7775TVFVBP4TKWJAU7FFGM3GBGHUTRUDSHI",
      engagementId: `ENG${id}`,
      title: `Project Title ${id}`,
      description: `This is a detailed description of the project ${id}.`,
      approver: "GDZHRK2UZHZAXSSXZAJRO7775TVFVBP4TKWJAU7FFGM3GBGHUTRUDSHI",
      serviceProvider: "GDZHRK2UZHZAXSSXZAJRO7775TVFVBP4TKWJAU7FFGM3GBGHUTRUDSHI",
      platformAddress: "GDZHRK2UZHZAXSSXZAJRO7775TVFVBP4TKWJAU7FFGM3GBGHUTRUDSHI",
      amount: "1000.00",
      platformFee: "50.00",
      milestones: [
        { description: `Initial phase of the project ${id}`, status: "Pending", approved_flag: false },
        { description: `Completion of design work ${id}`, status: "Pending", approved_flag: false }
      ],
      releaseSigner: "GDZHRK2UZHZAXSSXZAJRO7775TVFVBP4TKWJAU7FFGM3GBGHUTRUDSHI",
      disputeResolver: "GDZHRK2UZHZAXSSXZAJRO7775TVFVBP4TKWJAU7FFGM3GBGHUTRUDSHI"
    };
  }
}