import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'WORKER_SERVICE',
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
    ]),
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
