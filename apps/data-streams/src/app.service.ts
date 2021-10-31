import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('WORKER_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
}
