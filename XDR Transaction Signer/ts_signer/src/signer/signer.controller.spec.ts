import { Test, TestingModule } from '@nestjs/testing';
import { SignerController } from './signer.controller';
import { SignerService } from './signer.service';

describe('SignerController', () => {
    let controller: SignerController;
    let service: SignerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SignerController],
            providers: [SignerService],
        }).compile();

        controller = module.get<SignerController>(SignerController);
        service = module.get<SignerService>(SignerService);
    });

    it('should sign a transaction', async () => {
        const result = { signedTransaction: 'signedXDR' };
        jest.spyOn(service, 'signTransaction').mockImplementation(async () => result);

        expect(await controller.signTransaction({
            unsignedXDR: 'unsignedXDR',
            signers: [{ publicKey: 'GB3D...', secretKey: 'SDS3...' }],
        })).toBe(result);
    });
});