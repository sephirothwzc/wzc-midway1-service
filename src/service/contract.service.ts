import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IContractModel } from '../lib/models/contract.model';

export interface IContractService extends ContractService {}

@provide()
export class ContractService extends ServiceBase {
  get Model(): any {
    return this.contractModel;
  }
  
  @inject()
  contractModel: IContractModel;
}
