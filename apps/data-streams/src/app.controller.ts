import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateWorkerDto } from './create-worker-job.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createWorker(@Body() createWorkerDto : CreateWorkerDto): string {
    return this.appService.createWorker(createWorkerDto);
  }
  
}
