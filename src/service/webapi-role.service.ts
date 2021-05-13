import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IWebapiRoleModel, WebapiRoleModel } from '../lib/models/webapi-role.model';
import { IRoleService } from './role.service';
import { IWebapiService } from './webapi.service';

export interface IWebapiRoleService extends WebapiRoleService {}

@provide()
export class WebapiRoleService extends ServiceGenericBase<WebapiRoleModel> {
  get Model(): any {
    return this.webapiRoleModel;
  }
  
  @inject()
  webapiRoleModel: IWebapiRoleModel;

  @inject()
  roleService: IRoleService;
  @inject()
  webapiService: IWebapiService;
  /**
   * 新增
   * @param values
   */
  public async create(values: WebapiRoleModel, useOptions?: CreateOptions): Promise<WebapiRoleModel> {
    const run = async (t: Transaction) => {
      if (values.roleIdObj && !values.roleId) {
        values.roleId = (
          await this.roleService.create(values.roleIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.webapiIdObj && !values.webapiId) {
        values.webapiId = (
          await this.webapiService.create(values.webapiIdObj, {
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
