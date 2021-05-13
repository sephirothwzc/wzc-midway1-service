import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IRoleModel, RoleModel } from '../lib/models/role.model';

export interface IRoleService extends RoleService {}

@provide()
export class RoleService extends ServiceGenericBase<RoleModel> {
  get Model(): any {
    return this.roleModel;
  }

  @inject()
  roleModel: IRoleModel;
}
