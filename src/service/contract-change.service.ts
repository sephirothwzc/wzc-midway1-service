import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractChangeModel, ContractChangeModel } from '../lib/models/contract-change.model';
import { IContractService } from './contract.service';

export interface IContractChangeService extends ContractChangeService {}

@provide()
export class ContractChangeService extends ServiceGenericBase<ContractChangeModel> {
  get Model(): any {
    return this.contractChangeModel;
  }
  
  @inject()
  contractChangeModel: IContractChangeModel;

  @inject()
  contractService: IContractService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractChangeModel, useOptions?: CreateOptions): Promise<ContractChangeModel> {
    const run = async (t: Transaction) => {
      if (values.contractIdObj && !values.contractId) {
        values.contractId = (
          await this.contractService.create(values.contractIdObj, {
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
