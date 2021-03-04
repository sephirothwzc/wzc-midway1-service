import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IRoleGroupItemModel } from '../lib/models/role-group-item.model';

export interface IRoleGroupItemService extends RoleGroupItemService {}

@provide()
export class RoleGroupItemService extends ServiceBase {
  get Model(): any {
    return this.roleGroupItemModel;
  }
  
  @inject()
  roleGroupItemModel: IRoleGroupItemModel;
}
