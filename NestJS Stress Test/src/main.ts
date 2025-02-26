import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DeployerService } from './endpoints/deployer.service';
import { ConfigService } from '@nestjs/config';
import { StressTestConfig } from './common.types';
import { writeFileSync } from 'fs';
import { format } from 'date-fns';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  try {
    logger.log('Starting automatic stress tests...');

    const deployerService = app.get(DeployerService);
    const configService = app.get(ConfigService);

    const config: StressTestConfig = {
      concurrentRequests: configService.get<number>('CONCURRENT_REQUESTS') || 10,
      totalRequests: configService.get<number>('TOTAL_REQUESTS') || 100,
      delayBetweenBatches: configService.get<number>('DELAY_BETWEEN_BATCHES') || 100,
    };

    logger.log(`Configuration: ${JSON.stringify(config)}`);

    // Execute the stress tests
    const result = await deployerService.runStressTest(config);

    // Display the results report in the console
    logger.log('Stress tests completed!');
    logger.log('==========================================================');
    logger.log('RESULTS REPORT:');
    logger.log(`Total time: ${result.totalDuration / 1000} seconds`);
    logger.log(`Total requests: ${result.totalRequests}`);
    logger.log(`Successful requests: ${result.successfulRequests}`);
    logger.log(`Failed requests: ${result.failedRequests}`);
    logger.log(`Success rate: ${(result.successfulRequests / result.totalRequests * 100).toFixed(2)}%`);
    logger.log(`Average response time: ${result.averageResponseTime.toFixed(2)} ms`);
    logger.log(`Requests per second: ${result.requestsPerSecond.toFixed(2)}`);
    logger.log('==========================================================');
    logger.log('Status codes:');
    Object.entries(result.statusCodes).forEach(([code, count]) => {
      logger.log(`  ${code}: ${count}`);
    });
    logger.log('==========================================================');
    logger.log('Errors:');
    Object.entries(result.errors).forEach(([error, count]) => {
      logger.log(`  ${error}: ${count}`);
    });
    logger.log('==========================================================');

    // Save the results to a CSV file
    const csvHeader = 'Metric,Value\n';
    const csvRows = [
      `Total time,${result.totalDuration / 1000} seconds`,
      `Total requests,${result.totalRequests}`,
      `Successful requests,${result.successfulRequests}`,
      `Failed requests,${result.failedRequests}`,
      `Success rate,${(result.successfulRequests / result.totalRequests * 100).toFixed(2)}%`,
      `Average response time,${result.averageResponseTime.toFixed(2)} ms`,
      `Requests per second,${result.requestsPerSecond.toFixed(2)}`,
      ...Object.entries(result.statusCodes).map(([code, count]) => `Status code ${code},${count}`),
      ...Object.entries(result.errors).map(([error, count]) => `Error ${error},${count}`),
    ].join('\n');

    const csvContent = csvHeader + csvRows;

    // Generate a filename based on the current date and time
    const currentDate = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    const csvFileName = `src/reports/stress_test_results_${currentDate}.csv`;

    // Write the CSV file
    writeFileSync(csvFileName, csvContent, 'utf8');
    logger.log(`Results saved to ${csvFileName}`);

    // Close the application after completing the tests
    logger.log('Closing the application...');
    await app.close();
    process.exit(0);
  } catch (error) {
    const logger = new Logger('StressTest');
    logger.error(`Error during stress tests: ${error.message}`, error.stack);
    await app.close();
    process.exit(1);
  }
}
bootstrap();