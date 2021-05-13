import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IAppUserRoleModel, AppUserRoleModel } from '../lib/models/app-user-role.model';
import { IAppUserService } from './app-user.service';

export interface IAppUserRoleService extends AppUserRoleService {}

@provide()
export class AppUserRoleService extends ServiceGenericBase<AppUserRoleModel> {
  get Model(): any {
    return this.appUserRoleModel;
  }
  
  @inject()
  appUserRoleModel: IAppUserRoleModel;

  @inject()
  appUserService: IAppUserService;
  /**
   * 新增
   * @param values
   */
  public async create(values: AppUserRoleModel, useOptions?: CreateOptions): Promise<AppUserRoleModel> {
    const run = async (t: Transaction) => {
      if (values.appUserIdObj && !values.appUserId) {
        values.appUserId = (
          await this.appUserService.create(values.appUserIdObj, {
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
