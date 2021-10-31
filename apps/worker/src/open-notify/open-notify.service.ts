import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';


@Injectable()
export class OpenNotifyService {
  constructor(private httpService: HttpService) {}

  getCurrentPosition(): Observable<AxiosResponse<issNowResponse[]>> {
    return this.httpService.get('http://api.open-notify.org/iss-now');
  }

  getCurrentAstronauts(): Observable<AxiosResponse<issNowResponse[]>> {
    return this.httpService.get('http://api.open-notify.org/astros');
  }
}


