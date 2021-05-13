import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { ICapitalAccountModel, CapitalAccountModel } from '../lib/models/capital-account.model';
import { IEnterpriseService } from './enterprise.service';

export interface ICapitalAccountService extends CapitalAccountService {}

@provide()
export class CapitalAccountService extends ServiceGenericBase<CapitalAccountModel> {
  get Model(): any {
    return this.capitalAccountModel;
  }
  
  @inject()
  capitalAccountModel: ICapitalAccountModel;

  @inject()
  enterpriseService: IEnterpriseService;
  /**
   * 新增
   * @param values
   */
  public async create(values: CapitalAccountModel, useOptions?: CreateOptions): Promise<CapitalAccountModel> {
    const run = async (t: Transaction) => {
      if (values.enterpriseIdObj && !values.enterpriseId) {
        values.enterpriseId = (
          await this.enterpriseService.create(values.enterpriseIdObj, {
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
