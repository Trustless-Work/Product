import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from '../src/common.service';
import { ConfigService } from '@nestjs/config';
import { RequestResult } from '../src/common.types';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBatches', () => {
    it('should create correct batches with even division', () => {
      const batches = service['createBatches'](10, 5);
      
      expect(batches.length).toBe(2);
      expect(batches[0]).toEqual([1, 2, 3, 4, 5]);
      expect(batches[1]).toEqual([6, 7, 8, 9, 10]);
    });

    it('should create correct batches with uneven division', () => {
      const batches = service['createBatches'](11, 5);
      
      expect(batches.length).toBe(3);
      expect(batches[0]).toEqual([1, 2, 3, 4, 5]);
      expect(batches[1]).toEqual([6, 7, 8, 9, 10]);
      expect(batches[2]).toEqual([11]);
    });
  });

  describe('processResults', () => {
    it('should correctly process test results', () => {
      const startTime = new Date('2023-01-01T10:00:00Z');
      const endTime = new Date('2023-01-01T10:00:10Z'); // 10 seconds later
      
      const results: RequestResult[] = [
        { id: 1, success: true, responseTime: 100, statusCode: 200 },
        { id: 2, success: false, responseTime: 200, statusCode: 400, error: 'Bad request' },
        { id: 3, success: true, responseTime: 300, statusCode: 200 },
      ];
      
      const processed = service['processResults'](results, startTime, endTime);
      
      expect(processed.totalRequests).toBe(3);
      expect(processed.successfulRequests).toBe(2);
      expect(processed.failedRequests).toBe(1);
      expect(processed.averageResponseTime).toBe(200);
      expect(processed.minResponseTime).toBe(100);
      expect(processed.maxResponseTime).toBe(300);
      expect(processed.statusCodes).toEqual({ 200: 2, 400: 1 });
      expect(processed.errors).toEqual({ 'Bad request': 1 });
    });
  });
});