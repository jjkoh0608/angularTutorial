import { Inject, Injectable } from '@angular/core';
import { RouteConfigToken } from './routeConfig.Service';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) { 
    console.log('ConfigService Initiallize')
    console.log(this.configToken);
  }
}
