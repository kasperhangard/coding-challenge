import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CronExpression } from '@nestjs/schedule';
import { CreateWorkerDto } from './create-worker-job.dto';
import { KillWorkerDto } from './kill-worker-job.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('WORKER_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  createWorker(body: CreateWorkerDto): string {

    this.clientProxy.emit('createWorker', body)
    return `Created worker for ${body.endpoint} with an interval of ${body.interval}`
  }

  killWorker(body: KillWorkerDto): string {
    this.clientProxy.emit('killWorker', body)
    return `killed worker for ${body.endpoint}`
  }

  killAllWorkers(): string {
    this.clientProxy.emit('killAllWorkers', '')
    return `killed all workers`
  }

  getHello(): string {
    return `Hello world!

    This API provides a couple of different endpoints.

    To Create a worker, hit:
    POST http://localhost:3000/createWorker with a body of {"endpoint": URL_TO_EXTRACT_FROM,"interval": CRON_EXPRESSION_ENUM}
    example: {"endpoint": "http://api.open-notify.org/astros","interval": "EVERY_5_MINUTES"}
    
    To kill a worker, hit:
    POST http://localhost:3000/killWorker with a body of {"endpoint": URL_TO_EXTRACT_FROM}
    example: {"endpoint": "http://api.open-notify.org/astros"}
    
    To kill all workers, hit:
    POST http://localhost:3000/killAllWorkers
    
    To retireve the data collected by the workers, hit:
    GET http://localhost:3000/data`;
  }
}
