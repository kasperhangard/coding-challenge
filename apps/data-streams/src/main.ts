import { INestApplication } from '@nestjs/common';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const initMicroservice = async (app: INestApplication) => {
  app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.CLOUD_AMQP_URL],
        queue: 'data_queue',
        noAck: false,
        queueOptions: {
          durable: false
        },
      },
    }
  );
  await app.startAllMicroservicesAsync();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initMicroservice(app);
  await app.listen(3000);
}
bootstrap();
