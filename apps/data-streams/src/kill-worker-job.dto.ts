import { IsUrl } from "class-validator";

export class KillWorkerDto {
    @IsUrl()
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }
}