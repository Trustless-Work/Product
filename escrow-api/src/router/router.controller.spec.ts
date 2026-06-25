import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { ConfigService } from "@nestjs/config";
import { RouterController } from "./router.controller";
import { RouterService } from "./router.service";
import { AutomationAuthGuard } from "./guards/auth.guard";

jest.setTimeout(30000);

const VALID_SECRET = "test-automation-secret";
const VALID_CONTRACT_ID =
  "CTEST1ROUTERCONTRACTIDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

describe("RouterController", () => {
  let app: INestApplication;
  let routerService: jest.Mocked<RouterService>;
  let configGet: jest.Mock;

  async function buildApp(guardDisabled = false) {
    configGet = jest.fn((key: string) => {
      const vals: Record<string, string> = {
        AUTOMATION_WEBHOOK_SECRET: VALID_SECRET,
        ROUTER_CONTRACT_ID: VALID_CONTRACT_ID,
      };
      return vals[key];
    });

    routerService = {
      distribute: jest.fn(),
    } as unknown as jest.Mocked<RouterService>;

    const builder = Test.createTestingModule({
      controllers: [RouterController],
      providers: [
        { provide: RouterService, useValue: routerService },
        {
          provide: ConfigService,
          useValue: { get: configGet, getOrThrow: configGet },
        },
        AutomationAuthGuard,
      ],
    });

    if (guardDisabled) {
      builder
        .overrideGuard(AutomationAuthGuard)
        .useValue({ canActivate: () => true });
    }

    const module: TestingModule = await builder.compile();
    app = module.createNestApplication();
    await app.init();
  }

  afterEach(async () => {
    await app?.close();
  });

  // ─── Authentication ───────────────────────────────────────────────────────────

  describe("Rejects unauthorized webhook requests", () => {
    beforeEach(async () => buildApp(false));

    it("returns 401 when x-automation-secret header is missing", async () => {
      await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({
          routerContractId: VALID_CONTRACT_ID,
          reason: "escrow_released",
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("returns 401 when x-automation-secret is wrong", async () => {
      await request(app.getHttpServer())
        .post("/api/router/distribute")
        .set("x-automation-secret", "wrong-secret")
        .send({
          routerContractId: VALID_CONTRACT_ID,
          reason: "escrow_released",
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("allows requests with a correct x-automation-secret", async () => {
      routerService.distribute.mockResolvedValue({
        status: "skipped",
        routerContractId: VALID_CONTRACT_ID,
        reason: "zero_balance",
      });

      await request(app.getHttpServer())
        .post("/api/router/distribute")
        .set("x-automation-secret", VALID_SECRET)
        .send({
          routerContractId: VALID_CONTRACT_ID,
          reason: "escrow_released",
        })
        .expect(HttpStatus.OK);
    });
  });

  // ─── Validation ───────────────────────────────────────────────────────────────

  describe("Rejects missing router contract ID", () => {
    beforeEach(async () => buildApp(true)); // guard disabled; focus on validation

    it("returns 400 when routerContractId is missing", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({ reason: "escrow_released" })
        .expect(HttpStatus.BAD_REQUEST);

      expect(res.body.message).toContain("routerContractId");
    });

    it("returns 400 when reason is missing", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({ routerContractId: VALID_CONTRACT_ID })
        .expect(HttpStatus.BAD_REQUEST);

      expect(res.body.message).toContain("reason");
    });

    it("returns 400 when routerContractId is not in the allowed list", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({ routerContractId: "CUNKNOWN123", reason: "escrow_released" })
        .expect(HttpStatus.BAD_REQUEST);

      expect(res.body.message).toContain("not in the list");
    });
  });

  // ─── Success response ─────────────────────────────────────────────────────────

  describe("Returns success response", () => {
    beforeEach(async () => buildApp(true));

    it("returns 200 with status and txHash on success", async () => {
      routerService.distribute.mockResolvedValue({
        status: "success",
        routerContractId: VALID_CONTRACT_ID,
        txHash: "deadbeef01",
      });

      const res = await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({
          routerContractId: VALID_CONTRACT_ID,
          reason: "escrow_released",
        })
        .expect(HttpStatus.OK);

      expect(res.body.status).toBe("success");
      expect(res.body.txHash).toBe("deadbeef01");
    });

    it("returns 200 with skipped status when balance is zero", async () => {
      routerService.distribute.mockResolvedValue({
        status: "skipped",
        routerContractId: VALID_CONTRACT_ID,
        reason: "zero_balance",
      });

      const res = await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({
          routerContractId: VALID_CONTRACT_ID,
          reason: "escrow_released",
        })
        .expect(HttpStatus.OK);

      expect(res.body.status).toBe("skipped");
    });

    it("returns 500 when the service throws", async () => {
      routerService.distribute.mockRejectedValue(
        new Error("Failed to submit transaction: timeout"),
      );

      await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({
          routerContractId: VALID_CONTRACT_ID,
          reason: "escrow_released",
        })
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    it("passes sourceEscrowId and idempotencyKey to the service", async () => {
      routerService.distribute.mockResolvedValue({
        status: "success",
        routerContractId: VALID_CONTRACT_ID,
        txHash: "hash123",
      });

      await request(app.getHttpServer())
        .post("/api/router/distribute")
        .send({
          routerContractId: VALID_CONTRACT_ID,
          reason: "escrow_released",
          sourceEscrowId: "CSOURCE",
          idempotencyKey: "idem-key-001",
        })
        .expect(HttpStatus.OK);

      expect(routerService.distribute).toHaveBeenCalledWith({
        routerContractId: VALID_CONTRACT_ID,
        reason: "escrow_released",
        sourceEscrowId: "CSOURCE",
        idempotencyKey: "idem-key-001",
      });
    });
  });

  // ─── Guard: no configured secret ──────────────────────────────────────────────

  describe("Guard: server misconfiguration", () => {
    it("returns 401 when AUTOMATION_WEBHOOK_SECRET is not configured", async () => {
      configGet = jest.fn(() => undefined); // no secret in env

      const module: TestingModule = await Test.createTestingModule({
        controllers: [RouterController],
        providers: [
          { provide: RouterService, useValue: { distribute: jest.fn() } },
          { provide: ConfigService, useValue: { get: configGet } },
          AutomationAuthGuard,
        ],
      }).compile();

      const misconfiguredApp = module.createNestApplication();
      await misconfiguredApp.init();

      await request(misconfiguredApp.getHttpServer())
        .post("/api/router/distribute")
        .set("x-automation-secret", "anything")
        .send({ routerContractId: VALID_CONTRACT_ID, reason: "test" })
        .expect(HttpStatus.UNAUTHORIZED);

      await misconfiguredApp.close();
    });
  });
});
