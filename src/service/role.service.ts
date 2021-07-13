import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IRoleModel, RoleModel } from '../lib/models/role.model';
import { IAppClientService } from './app-client.service';

export interface IRoleService extends RoleService {}

@provide()
export class RoleService extends ServiceGenericBase<RoleModel> {
  get Model(): any {
    return this.roleModel;
  }
  
  @inject()
  roleModel: IRoleModel;

  @inject()
  appClientService: IAppClientService;
  /**
   * 新增
   * @param values
   */
  public async create(values: RoleModel, useOptions?: CreateOptions): Promise<RoleModel> {
    const run = async (t: Transaction) => {
      if (values.appIdObj && !values.appId) {
        values.appId = (
          await this.appClientService.create(values.appIdObj, {
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
