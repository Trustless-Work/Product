import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { EventListenerService } from './event-listener.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  providers: [EventListenerService],
  exports: [EventListenerService],
})
export class EventListenerModule {}
