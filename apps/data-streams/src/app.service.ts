import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateWorkerDto } from './create-worker-job.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('WORKER_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  createWorker(createWorkerDto: CreateWorkerDto): string {
    this.clientProxy.emit(createWorkerDto.endpoint, createWorkerDto.interval)
    return `Created worker for ${createWorkerDto.endpoint} with an interval of ${createWorkerDto.interval}`
  }

  getHello(): string {
    return 'Hello World!';
  }
}
