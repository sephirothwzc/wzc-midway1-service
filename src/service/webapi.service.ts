import { provide, inject } from 'midway';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IWebapiModel, WebapiModel } from '../lib/models/webapi.model';

export interface IWebapiService extends WebapiService {}

@provide()
export class WebapiService extends ServiceGenericBase<WebapiModel> {
  get Model(): any {
    return this.webapiModel;
  }

  @inject()
  webapiModel: IWebapiModel;
}
