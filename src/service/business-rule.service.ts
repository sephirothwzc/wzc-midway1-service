import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IBusinessRuleModel } from '../lib/models/business-rule.model';

export interface IBusinessRuleService extends BusinessRuleService {}

@provide()
export class BusinessRuleService extends ServiceBase {
  get Model(): any {
    return this.businessRuleModel;
  }
  
  @inject()
  businessRuleModel: IBusinessRuleModel;
}
