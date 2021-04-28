import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IContractSignModel } from '../lib/models/contract-sign.model';

export interface IContractSignService extends ContractSignService {}

@provide()
export class ContractSignService extends ServiceBase {
  get Model(): any {
    return this.contractSignModel;
  }
  
  @inject()
  contractSignModel: IContractSignModel;
}
