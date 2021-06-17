import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractMeetingModel, ContractMeetingModel } from '../lib/models/contract-meeting.model';
import { IContractService } from './contract.service';

export interface IContractMeetingService extends ContractMeetingService {}

@provide()
export class ContractMeetingService extends ServiceGenericBase<ContractMeetingModel> {
  get Model(): any {
    return this.contractMeetingModel;
  }
  
  @inject()
  contractMeetingModel: IContractMeetingModel;

  @inject()
  contractService: IContractService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractMeetingModel, useOptions?: CreateOptions): Promise<ContractMeetingModel> {
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
