import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from 'apps/data-streams/src/create-worker-job.dto';
import { KillWorkerDto } from 'apps/data-streams/src/kill-worker-job.dto';


@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {
  }


  private readonly logger = new Logger();

  getHello(): string {
    return this.workerService.getHello();
  }

  @MessagePattern('createWorker')
  createWorker(@Payload() data: CreateWorkerDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    this.workerService.createWorker(data);
  }

  @MessagePattern('killWorker')
  killWorker(@Payload() data: KillWorkerDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    this.workerService.killWorker(data);
  }


  // @MessagePattern('http://api.open-notify.org/astros')
  // bla(@Payload() data: KillWorkerDto, @Ctx() context: RmqContext){
  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();
  //   channel.ack(originalMsg);
  // }

}
