import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { get } from 'http';
import { AppService } from './app.service';
import { CreateWorkerDto } from './create-worker-job.dto';
import { KillWorkerDto } from './kill-worker-job.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/createWorker')
  createWorker(@Body() body : CreateWorkerDto): string {
    return this.appService.createWorker(body);
  }

  
  @Post('/killWorker')
  killWorker(@Body() body : KillWorkerDto): string {
    return this.appService.killWorker(body);
  }

  @Get('/data')
  getData(): string {
    return "datta"
  }
  
}
