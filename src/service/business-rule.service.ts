import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IBusinessRuleModel, BusinessRuleModel } from '../lib/models/business-rule.model';
import { IAppClientService } from './app-client.service';

export interface IBusinessRuleService extends BusinessRuleService {}

@provide()
export class BusinessRuleService extends ServiceGenericBase<BusinessRuleModel> {
  get Model(): any {
    return this.businessRuleModel;
  }
  
  @inject()
  businessRuleModel: IBusinessRuleModel;

  @inject()
  appClientService: IAppClientService;
  /**
   * 新增
   * @param values
   */
  public async create(values: BusinessRuleModel, useOptions?: CreateOptions): Promise<BusinessRuleModel> {
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
