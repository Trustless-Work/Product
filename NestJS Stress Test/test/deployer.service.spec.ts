import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DeployerService } from '../src/endpoints/deployer.service';
import axios from 'axios';
import { Keypair, Networks, Transaction, TransactionBuilder, Horizon } from '@stellar/stellar-sdk';

// Mock axios
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

// Mock Stellar SDK
jest.mock('@stellar/stellar-sdk', () => {
  return {
    Keypair: {
      fromSecret: jest.fn().mockReturnValue({
        sign: jest.fn(),
      }),
    },
    Networks: {
      PUBLIC: 'public',
      TESTNET: 'testnet',
    },
    TransactionBuilder: {
      fromXDR: jest.fn().mockReturnValue({
        sign: jest.fn(),
        toXDR: jest.fn().mockReturnValue('mocked-signed-transaction-xdr'),
      }),
    },
    Horizon: {
      Server: jest.fn().mockImplementation(() => ({
        submitTransaction: jest.fn().mockResolvedValue({ result: 'success' }),
      })),
    },
    Transaction: jest.fn().mockImplementation(() => ({
      sequence: '123456789',
    })),
  };
});

describe('DeployerService', () => {
  let service: DeployerService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'TRUSTLESS_API_KEY': 'test-api-key',
        'DEPLOYER_ENDPOINT': 'https://test-api.example.com/deployer',
        'STELLAR_SECRET_KEY': 'test-secret-key',
        'STELLAR_PUBLIC_KEY': 'test-public-key',
        'STELLAR_NETWORK': 'testnet',
        'STELLAR_SERVER': 'https://horizon-testnet.stellar.org',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeployerService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<DeployerService>(DeployerService);
    configService = module.get<ConfigService>(ConfigService);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('runStressTest', () => {
    it('should execute stress test with correct number of requests', async () => {
      // Mock executeDeployerRequest to return successful results
      jest.spyOn<any, any>(service, 'executeDeployerRequest').mockImplementation(
        (endpoint, id) => Promise.resolve({
          id,
          success: true,
          responseTime: 100,
          statusCode: 200,
        })
      );

      const config = {
        concurrentRequests: 2,
        totalRequests: 4,
        delayBetweenBatches: 100,
      };

      const result = await service.runStressTest(config);

      // Expect 4 total requests as specified in the config
      expect(result.totalRequests).toBe(4);
      expect(result.successfulRequests).toBe(4);
      expect(result.failedRequests).toBe(0);
      expect(service['executeDeployerRequest']).toHaveBeenCalledTimes(4);
    });

    it('should handle failed requests correctly', async () => {
      // Mock some requests to fail
      jest.spyOn<any, any>(service, 'executeDeployerRequest').mockImplementation(
        (endpoint, id: number) => Promise.resolve({
          id,
          success: id % 2 === 0, // Every other request fails
          responseTime: 100,
          statusCode: id % 2 === 0 ? 200 : 400,
          error: id % 2 === 0 ? undefined : 'Test error',
        })
      );

      const config = {
        concurrentRequests: 2,
        totalRequests: 4,
        delayBetweenBatches: 100,
      };

      const result = await service.runStressTest(config);

      expect(result.totalRequests).toBe(4);
      expect(result.successfulRequests).toBe(2);
      expect(result.failedRequests).toBe(2);
      expect(service['executeDeployerRequest']).toHaveBeenCalledTimes(4);
    });
  });

  describe('executeDeployerRequest', () => {
    it('should handle successful response with transaction', async () => {
      // Mock axios POST to return a successful response
      mockAxios.post.mockResolvedValueOnce({
        status: 200,
        data: { unsignedTransaction: 'test-unsigned-transaction' },
      });

      // Mock internal methods
      jest.spyOn<any, any>(service, 'signTransaction').mockResolvedValueOnce('test-signed-transaction');
      jest.spyOn<any, any>(service, 'submitTransaction').mockResolvedValueOnce({ success: true });

      const result = await service['executeDeployerRequest']('https://test-endpoint', 1);

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://test-endpoint',
        expect.any(Object),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-api-key',
          }),
        })
      );
      expect(service['signTransaction']).toHaveBeenCalledWith('test-unsigned-transaction', expect.anything());
      expect(service['submitTransaction']).toHaveBeenCalledWith('test-signed-transaction');
    });

    it('should handle API error', async () => {
      // Mock axios POST to throw an error
      mockAxios.post.mockRejectedValueOnce({
        response: {
          status: 400,
          data: { message: 'Bad request' },
        },
      });

      const result = await service['executeDeployerRequest']('https://test-endpoint', 1);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(result.error).toBe('Bad request');
    });
  });
});