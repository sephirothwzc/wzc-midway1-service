import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IBusinessRuleModel,
  BusinessRuleModel,
} from '../lib/models/business-rule.model';

export interface IBusinessRuleService extends BusinessRuleService {}

@provide()
export class BusinessRuleService extends ServiceGenericBase<BusinessRuleModel> {
  get Model(): any {
    return this.businessRuleModel;
  }

  @inject()
  businessRuleModel: IBusinessRuleModel;
}
