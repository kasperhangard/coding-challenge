export class extractedData{
    endpoint: string;
    timestamp: Date;
    data: string;

    constructor(endpoint: string, timestamp: Date, data: string){
        this.endpoint = endpoint;
        this.timestamp = timestamp || new Date;
        this.data = data;
    }
}
