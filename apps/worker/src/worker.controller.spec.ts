import { HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { WorkerController } from './worker.controller';
import { WorkerModule } from './worker.module';
import { WorkerService } from './worker.service';

describe('WorkerController', () => {
  let workerController: WorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [WorkerService],
      imports: [ConfigModule.forRoot(),
      HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
      }),
      ScheduleModule.forRoot(),
      ClientsModule.register([
        {
          name: 'DATA_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [process.env.CLOUD_AMQP_URL],
            queue: 'data_queue',
            noAck: false,
            queueOptions: {
              durable: false
            },
          },
        },
      ]),]
    }).compile();

    workerController = app.get<WorkerController>(WorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(workerController.getHello()).toBe('Hello World!');
    });
  });
});