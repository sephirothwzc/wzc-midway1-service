import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IContractFileHisModel,
  ContractFileHisModel,
} from '../lib/models/contract-file-his.model';
import { IContractFileService } from './contract-file.service';
import { IContractService } from './contract.service';

export interface IContractFileHisService extends ContractFileHisService {}

@provide()
export class ContractFileHisService extends ServiceGenericBase<ContractFileHisModel> {
  get Model(): any {
    return this.contractFileHisModel;
  }

  @inject()
  contractFileHisModel: IContractFileHisModel;

  @inject()
  contractFileService: IContractFileService;
  @inject()
  contractService: IContractService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: ContractFileHisModel,
    useOptions?: CreateOptions
  ): Promise<ContractFileHisModel> {
    const run = async (t: Transaction) => {
      if (values.contractFileIdObj && !values.contractFileId) {
        values.contractFileId = (
          await this.contractFileService.create(values.contractFileIdObj, {
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
