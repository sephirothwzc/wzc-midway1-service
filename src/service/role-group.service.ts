import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IRoleGroupModel } from '../lib/models/role-group.model';

export interface IRoleGroupService extends RoleGroupService {}

@provide()
export class RoleGroupService extends ServiceBase {
  get Model(): any {
    return this.roleGroupModel;
  }
  
  @inject()
  roleGroupModel: IRoleGroupModel;
}
