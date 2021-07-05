import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IContractChangeFileModel,
  ContractChangeFileModel,
} from '../lib/models/contract-change-file.model';
import { IContractChangeService } from './contract-change.service';
import { IContractService } from './contract.service';

export interface IContractChangeFileService extends ContractChangeFileService {}

@provide()
export class ContractChangeFileService extends ServiceGenericBase<ContractChangeFileModel> {
  get Model(): any {
    return this.contractChangeFileModel;
  }

  @inject()
  contractChangeFileModel: IContractChangeFileModel;

  @inject()
  contractChangeService: IContractChangeService;
  @inject()
  contractService: IContractService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: ContractChangeFileModel,
    useOptions?: CreateOptions
  ): Promise<ContractChangeFileModel> {
    const run = async (t: Transaction) => {
      if (values.contractChangeIdObj && !values.contractChangeId) {
        values.contractChangeId = (
          await this.contractChangeService.create(values.contractChangeIdObj, {
            transaction: t,
          })
        ).get('id');
      }
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
