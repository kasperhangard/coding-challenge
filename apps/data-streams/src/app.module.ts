import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
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
})

export class AppModule {}
