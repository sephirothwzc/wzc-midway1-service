import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IRoleGroupModel, RoleGroupModel } from '../lib/models/role-group.model';
import { IAppClientService } from './app-client.service';

export interface IRoleGroupService extends RoleGroupService {}

@provide()
export class RoleGroupService extends ServiceGenericBase<RoleGroupModel> {
  get Model(): any {
    return this.roleGroupModel;
  }
  
  @inject()
  roleGroupModel: IRoleGroupModel;

  @inject()
  appClientService: IAppClientService;
  /**
   * 新增
   * @param values
   */
  public async create(values: RoleGroupModel, useOptions?: CreateOptions): Promise<RoleGroupModel> {
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
