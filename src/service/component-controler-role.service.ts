import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IComponentControlerRoleModel, ComponentControlerRoleModel } from '../lib/models/component-controler-role.model';
import { IAppClientService } from './app-client.service';
import { IRoleService } from './role.service';
import { IComponentControlerService } from './component-controler.service';

export interface IComponentControlerRoleService extends ComponentControlerRoleService {}

@provide()
export class ComponentControlerRoleService extends ServiceGenericBase<ComponentControlerRoleModel> {
  get Model(): any {
    return this.componentControlerRoleModel;
  }
  
  @inject()
  componentControlerRoleModel: IComponentControlerRoleModel;

  @inject()
  appClientService: IAppClientService;
  @inject()
  roleService: IRoleService;
  @inject()
  componentControlerService: IComponentControlerService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ComponentControlerRoleModel, useOptions?: CreateOptions): Promise<ComponentControlerRoleModel> {
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
      if (values.componentControlerIdObj && !values.componentControlerId) {
        values.componentControlerId = (
          await this.componentControlerService.create(values.componentControlerIdObj, {
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
