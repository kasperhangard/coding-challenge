import { HttpModule, Module } from '@nestjs/common';
import { OpenNotifyService } from './open-notify.service';
import { OpenNotifyController } from './open-notify.controller';



@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [OpenNotifyService],
  controllers: [OpenNotifyController]
})
export class OpenNotifyModule {}

