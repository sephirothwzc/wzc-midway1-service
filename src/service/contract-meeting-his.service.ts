import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractMeetingHisModel, ContractMeetingHisModel } from '../lib/models/contract-meeting-his.model';
import { IContractMeetingService } from './contract-meeting.service';
import { IContractService } from './contract.service';

export interface IContractMeetingHisService extends ContractMeetingHisService {}

@provide()
export class ContractMeetingHisService extends ServiceGenericBase<ContractMeetingHisModel> {
  get Model(): any {
    return this.contractMeetingHisModel;
  }
  
  @inject()
  contractMeetingHisModel: IContractMeetingHisModel;

  @inject()
  contractMeetingService: IContractMeetingService;
  @inject()
  contractService: IContractService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractMeetingHisModel, useOptions?: CreateOptions): Promise<ContractMeetingHisModel> {
    const run = async (t: Transaction) => {
      if (values.contractMeetingIdObj && !values.contractMeetingId) {
        values.contractMeetingId = (
          await this.contractMeetingService.create(values.contractMeetingIdObj, {
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
