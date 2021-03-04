import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IWebapiRoleModel } from '../lib/models/webapi-role.model';

export interface IWebapiRoleService extends WebapiRoleService {}

@provide()
export class WebapiRoleService extends ServiceBase {
  get Model(): any {
    return this.webapiRoleModel;
  }
  
  @inject()
  webapiRoleModel: IWebapiRoleModel;
}
