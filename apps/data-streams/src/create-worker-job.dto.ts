import { CronExpression } from "@nestjs/schedule";
import { IsIn, IsNotEmpty, IsUrl } from "class-validator";

export class CreateWorkerDto {

    @IsUrl()
    endpoint: string;
    
    @IsIn(Object.keys(CronExpression))
    interval: string;

    constructor(endpoint: string, interval: string){
        this.endpoint = endpoint;
        this.interval = interval;
    }
}