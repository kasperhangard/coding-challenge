import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'DATA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.CLOUD_AMQPS_URL],
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
