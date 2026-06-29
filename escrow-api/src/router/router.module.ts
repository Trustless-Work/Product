import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AutomationAuthGuard } from "./guards/auth.guard";
import { RouterController } from "./router.controller";
import { RouterService } from "./router.service";

@Module({
  imports: [ConfigModule],
  controllers: [RouterController],
  providers: [RouterService, AutomationAuthGuard],
})
export class RouterModule {}
