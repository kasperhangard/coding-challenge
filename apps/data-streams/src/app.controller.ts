import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('WORKER_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Endpoint for testing whether the RabbitMQ flow works. 
  @Post()
  async all(){
    this.client.emit('testRMQ', 'hello world');
    return "Sent hello World";
  }
  
}
