import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { EventListenerModule } from "./event-listener/event-listener.module";

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), EventListenerModule],
})
export class AppModule {}
