import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) { }

  getHello(): string {
    return this.workerService.getHello();
  }

  // @EventPattern('testRMQ')
  // async hello(data: string){
  //   console.log(data)
  // }

  // @MessagePattern('open-notify/getcurrentposition')
  // TestRMQ(@Payload() data: string, @Ctx() context: RmqContext) {
  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();
  //   console.log(data)
  //   channel.ack(originalMsg);
  // }

}
