import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://ljalvdxj:Mv_tgM_sTu2N833j3gMmGQdhcGGhfmQg@hawk.rmq.cloudamqp.com/ljalvdxj'],
      queue: 'worker_queue',
      noAck: false,
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen(async () => {
    console.log('Microservice is listening');
  });
}
bootstrap();
