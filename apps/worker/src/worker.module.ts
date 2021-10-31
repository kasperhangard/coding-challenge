import { HttpModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://ljalvdxj:Mv_tgM_sTu2N833j3gMmGQdhcGGhfmQg@hawk.rmq.cloudamqp.com/ljalvdxj'],
          queue: 'data_queue',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ScheduleModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule { }
