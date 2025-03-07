import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
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
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  initMicroservice(app);
  await app.listen(3000);
}
bootstrap();
