import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StressModule } from './stress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StressModule,
  ],
})
export class AppModule {}