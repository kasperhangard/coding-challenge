import { ValidationPipe, ArgumentMetadata } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { WorkerService } from '../../worker/src/worker.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateWorkerDto } from './create-worker-job.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.register([
        {
          name: 'WORKER_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [process.env.CLOUD_AMQP_URL],
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
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toContain('Hello world!');
    });
  });

  describe('createWorker', () => {
    it('should create a worker job', async () => {
      const result = 'test';
      const body = new CreateWorkerDto('test', 'EVERY_5_SECONDS')
      jest.spyOn(appService, 'createWorker').mockImplementation(() => result);

      expect(await appController.createWorker(body)).toBe(result)
    })
  })

  describe('createWorkerDTO validation', () => {
    it('should fail if end is not URL or interval is empty', async() => {
      let target: ValidationPipe = new ValidationPipe({ transform: true, whitelist: true });
      const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateWorkerDto,
          data: '{"endpoint": "http://api.open-notify.org/astros","interval": "EVERY_5_SECONDS"}'
      };
      await target.transform(<CreateWorkerDto>{}, metadata)
          .catch(err => { //TODO: figure out how to do this, instead of heardcoding the message index
              expect(err.getResponse().message[0]).toBe("endpoint must be an URL address")
              expect(err.getResponse().message[1]).toContain("interval must be one of the following values")
          })
  });
  })
});
