import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IRoleModel } from '../lib/models/role.model';

export interface IRoleService extends RoleService {}

@provide()
export class RoleService extends ServiceBase {
  get Model(): any {
    return this.roleModel;
  }
  
  @inject()
  roleModel: IRoleModel;
}
