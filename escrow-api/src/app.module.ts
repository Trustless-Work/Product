import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { EventListenerModule } from "./event-listener/event-listener.module";
import { RouterModule } from "./router/router.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    EventListenerModule,
    RouterModule,
  ],
})
export class AppModule {}
