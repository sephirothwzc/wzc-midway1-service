import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IContractCollectionPaymentModel } from '../lib/models/contract-collection-payment.model';

export interface IContractCollectionPaymentService extends ContractCollectionPaymentService {}

@provide()
export class ContractCollectionPaymentService extends ServiceBase {
  get Model(): any {
    return this.contractCollectionPaymentModel;
  }
  
  @inject()
  contractCollectionPaymentModel: IContractCollectionPaymentModel;
}
