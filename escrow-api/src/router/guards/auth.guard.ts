import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class AutomationAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expectedSecret = this.config.get<string>("AUTOMATION_WEBHOOK_SECRET");

    if (!expectedSecret) {
      throw new UnauthorizedException(
        "Server misconfiguration: AUTOMATION_WEBHOOK_SECRET is not set.",
      );
    }

    const request = context.switchToHttp().getRequest<Request>();
    const providedSecret = request.headers["x-automation-secret"];

    if (!providedSecret || providedSecret !== expectedSecret) {
      throw new UnauthorizedException(
        "Invalid or missing x-automation-secret header.",
      );
    }

    return true;
  }
}
