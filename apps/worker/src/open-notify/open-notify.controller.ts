import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { OpenNotifyService } from './open-notify.service';

@Controller('open-notify')
export class OpenNotifyController {
  constructor(private readonly openNotifyService: OpenNotifyService) { }

  @MessagePattern('open-notify/getcurrentposition')
  GetCurrentPosition(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    this.openNotifyService.getCurrentPosition().toPromise().then(res => console.log(res))
    
    channel.ack(originalMsg);
  }

  @MessagePattern('open-notify/getcurrentastronauts')
  GetCurrentAstronauts(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    this.openNotifyService.getCurrentAstronauts().toPromise().then(res => console.log(res))
    
    channel.ack(originalMsg);
  }

}
