import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { ErrorHandleModule } from './error-handle/error-handle.module';
import { HandleServiceService } from './handle-service/handle-service.service';

@Module({
  imports: [UrlModule, ErrorHandleModule],
  controllers: [AppController],
  providers: [AppService, HandleServiceService],
})
export class AppModule {}
