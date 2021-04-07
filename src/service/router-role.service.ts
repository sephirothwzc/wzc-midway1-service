import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IRouterRoleModel } from '../lib/models/router-role.model';

export interface IRouterRoleService extends RouterRoleService {}

@provide()
export class RouterRoleService extends ServiceBase {
  get Model(): any {
    return this.routerRoleModel;
  }
  
  @inject()
  routerRoleModel: IRouterRoleModel;
}
