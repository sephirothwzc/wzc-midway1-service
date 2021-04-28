import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IContractCollectionPaymentPlanModel } from '../lib/models/contract-collection-payment-plan.model';

export interface IContractCollectionPaymentPlanService extends ContractCollectionPaymentPlanService {}

@provide()
export class ContractCollectionPaymentPlanService extends ServiceBase {
  get Model(): any {
    return this.contractCollectionPaymentPlanModel;
  }
  
  @inject()
  contractCollectionPaymentPlanModel: IContractCollectionPaymentPlanModel;
}
