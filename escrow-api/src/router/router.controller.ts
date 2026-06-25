import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DistributeRouterDto } from "./dto/distribute-router.dto";
import { AutomationAuthGuard } from "./guards/auth.guard";
import { RouterService } from "./router.service";

@Controller("api/router")
@UseGuards(AutomationAuthGuard)
export class RouterController {
  constructor(
    private readonly routerService: RouterService,
    private readonly config: ConfigService,
  ) {}

  @Post("distribute")
  @HttpCode(HttpStatus.OK)
  async distribute(@Body() body: DistributeRouterDto) {
    const { routerContractId, reason, sourceEscrowId, idempotencyKey } =
      body ?? {};

    if (!routerContractId || typeof routerContractId !== "string") {
      throw new BadRequestException(
        "routerContractId is required and must be a string.",
      );
    }

    if (!reason || typeof reason !== "string") {
      throw new BadRequestException("reason is required and must be a string.");
    }

    // Validate against allowed contract IDs (comma-separated ROUTER_CONTRACT_ID env var)
    const allowedRaw = this.config.get<string>("ROUTER_CONTRACT_ID");
    if (allowedRaw) {
      const allowed = allowedRaw.split(",").map((c) => c.trim());
      if (!allowed.includes(routerContractId)) {
        throw new BadRequestException(
          `Router contract "${routerContractId}" is not in the list of supported contracts.`,
        );
      }
    }

    try {
      return await this.routerService.distribute({
        routerContractId,
        reason,
        sourceEscrowId,
        idempotencyKey,
      });
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
