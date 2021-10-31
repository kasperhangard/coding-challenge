import { Module } from '@nestjs/common';
import { OpenNotifyModule } from './open-notify/open-notify.module';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [OpenNotifyModule],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
