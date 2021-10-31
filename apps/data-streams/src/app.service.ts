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

    if(Object.keys(CronExpression).includes(body.interval) == false){
      return `Invalid interval specified. Please use one of the following:\n${Object.keys(CronExpression).join('\n')}`
    }

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
    return 'Hello World!';
  }
}
