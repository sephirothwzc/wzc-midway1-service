import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractFileModel, ContractFileModel } from '../lib/models/contract-file.model';
import { IContractService } from './contract.service';

export interface IContractFileService extends ContractFileService {}

@provide()
export class ContractFileService extends ServiceGenericBase<ContractFileModel> {
  get Model(): any {
    return this.contractFileModel;
  }
  
  @inject()
  contractFileModel: IContractFileModel;

  @inject()
  contractService: IContractService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractFileModel, useOptions?: CreateOptions): Promise<ContractFileModel> {
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
