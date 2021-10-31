import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { extractedData } from 'apps/worker/src/extracted-data.dto';
import { get } from 'http';
import { AppService } from './app.service';
import { CreateWorkerDto } from './create-worker-job.dto';
import { KillWorkerDto } from './kill-worker-job.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}
  	
  private dataDict = {}

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

  @Post('/killAllWorkers')
  killAllWorkers(): string {
    return this.appService.killAllWorkers();
  }

  @Get('/data')
  getData(): string {
    return JSON.stringify(this.dataDict);
  }


  @MessagePattern('data')
  recieveData(@Payload() data: extractedData, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.addEntryToDict(data);
    channel.ack(originalMsg);
  }



  addEntryToDict = (entry: extractedData) => {
    this.dataDict[entry.endpoint] ? this.dataDict[entry.endpoint].push(entry) : this.dataDict[entry.endpoint] = [{entry}]
  }

  
}
