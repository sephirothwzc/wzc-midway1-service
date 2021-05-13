import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IRoleGroupModel,
  RoleGroupModel,
} from '../lib/models/role-group.model';

export interface IRoleGroupService extends RoleGroupService {}

@provide()
export class RoleGroupService extends ServiceGenericBase<RoleGroupModel> {
  get Model(): any {
    return this.roleGroupModel;
  }

  @inject()
  roleGroupModel: IRoleGroupModel;
}
