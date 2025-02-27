import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignerModule } from './signer/signer.module';

@Module({
  imports: [SignerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
