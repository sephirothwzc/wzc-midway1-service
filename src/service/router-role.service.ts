import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IRouterRoleModel, RouterRoleModel } from '../lib/models/router-role.model';
import { IRoleService } from './role.service';
import { IRouterService } from './router.service';

export interface IRouterRoleService extends RouterRoleService {}

@provide()
export class RouterRoleService extends ServiceGenericBase<RouterRoleModel> {
  get Model(): any {
    return this.routerRoleModel;
  }
  
  @inject()
  routerRoleModel: IRouterRoleModel;

  @inject()
  roleService: IRoleService;
  @inject()
  routerService: IRouterService;
  /**
   * 新增
   * @param values
   */
  public async create(values: RouterRoleModel, useOptions?: CreateOptions): Promise<RouterRoleModel> {
    const run = async (t: Transaction) => {
      if (values.roleIdObj && !values.roleId) {
        values.roleId = (
          await this.roleService.create(values.roleIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.routerIdObj && !values.routerId) {
        values.routerId = (
          await this.routerService.create(values.routerIdObj, {
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
