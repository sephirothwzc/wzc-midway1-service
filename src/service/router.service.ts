import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IRouterModel } from '../lib/models/router.model';

export interface IRouterService extends RouterService {}

@provide()
export class RouterService extends ServiceBase {
  get Model(): any {
    return this.routerModel;
  }
  
  @inject()
  routerModel: IRouterModel;
}
