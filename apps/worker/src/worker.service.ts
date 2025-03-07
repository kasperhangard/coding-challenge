import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { CronJob } from 'cron';
import { CreateWorkerDto } from '../../data-streams/src/create-worker-job.dto';
import { KillWorkerDto } from '../../data-streams/src/kill-worker-job.dto';
import { extractedData } from './extracted-data.dto';

@Injectable()
export class WorkerService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private httpService: HttpService,
    @Inject('DATA_SERVICE') private readonly clientProxy: ClientProxy) { }


  getHello(): string {
    return 'Hello World!';
  }

  private readonly logger = new Logger();

  createWorker(body: CreateWorkerDto): void {
    try {
      this.logger.log(`Creating Cron job for ${body.endpoint} with an interval of ${body.interval}`);
      const job = new CronJob(
        CronExpression[body.interval],
        async () => {
          const fetchedData = await this.fetchData(body.endpoint);
          const dataObject = new extractedData(body.endpoint, new Date(), fetchedData.data);
          this.clientProxy.emit('data', dataObject)
        }
      );
      console.log("Job created")

      this.schedulerRegistry.addCronJob(body.endpoint, job);
      console.log("staring job")
      job.start();
      this.logger.log(`Cron job for ${body.endpoint} created.`);

    } catch (err) {
      this.logger.error(err);
    }
  }

  killWorker(body: KillWorkerDto): void {

    try {
      this.logger.log(`Killing the worker for ${body.endpoint}`);

      this.schedulerRegistry.deleteCronJob(body.endpoint);
    } catch (err) {
      this.logger.error(err)
    }

  }

  killAllWorkers(): void {

    try {
      this.logger.log(`Killing all workers`);

      for (let jobEndpoint of this.schedulerRegistry.getCronJobs().keys()) {
        this.killWorker(new KillWorkerDto(jobEndpoint));
      }
    } catch (err) {
      this.logger.error(err)
    }
  }

  private fetchData(endpoint: string): Promise<AxiosResponse<string>> {
    try {
      return this.httpService.get(endpoint).toPromise();
    } catch (err) {
      this.logger.error(err)
    }
  }

}

