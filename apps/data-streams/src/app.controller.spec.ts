import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.register([
        {
          name: 'WORKER_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqps://ljalvdxj:Mv_tgM_sTu2N833j3gMmGQdhcGGhfmQg@hawk.rmq.cloudamqp.com/ljalvdxj'],
            queue: 'worker_queue',
            noAck: false,
            queueOptions: {
              durable: false
            },
          },
        },
      ]),],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
