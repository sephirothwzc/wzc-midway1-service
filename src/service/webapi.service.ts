import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IWebapiModel } from '../lib/models/webapi.model';

export interface IWebapiService extends WebapiService {}

@provide()
export class WebapiService extends ServiceBase {
  get Model(): any {
    return this.webapiModel;
  }
  
  @inject()
  webapiModel: IWebapiModel;
}
