import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IRoleGroupItemModel, RoleGroupItemModel } from '../lib/models/role-group-item.model';
import { IAppClientService } from './app-client.service';
import { IRoleService } from './role.service';
import { IRoleGroupService } from './role-group.service';

export interface IRoleGroupItemService extends RoleGroupItemService {}

@provide()
export class RoleGroupItemService extends ServiceGenericBase<RoleGroupItemModel> {
  get Model(): any {
    return this.roleGroupItemModel;
  }
  
  @inject()
  roleGroupItemModel: IRoleGroupItemModel;

  @inject()
  appClientService: IAppClientService;
  @inject()
  roleService: IRoleService;
  @inject()
  roleGroupService: IRoleGroupService;
  /**
   * 新增
   * @param values
   */
  public async create(values: RoleGroupItemModel, useOptions?: CreateOptions): Promise<RoleGroupItemModel> {
    const run = async (t: Transaction) => {
      if (values.appIdObj && !values.appId) {
        values.appId = (
          await this.appClientService.create(values.appIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.roleIdObj && !values.roleId) {
        values.roleId = (
          await this.roleService.create(values.roleIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.roleGroupIdObj && !values.roleGroupId) {
        values.roleGroupId = (
          await this.roleGroupService.create(values.roleGroupIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      return super.create(values, {
        transaction: t,
      });
    };
    return await this.useTransaction(run, useOptions);
  }
  
}
