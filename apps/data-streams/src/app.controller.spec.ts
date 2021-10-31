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
          name: 'DATA_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [process.env.CLOUD_AMQPS_URL],
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
