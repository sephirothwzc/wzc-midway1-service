import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractCollectionPaymentPlanModel, ContractCollectionPaymentPlanModel } from '../lib/models/contract-collection-payment-plan.model';
import { IContractService } from './contract.service';
import { IDataDictionaryService } from './data-dictionary.service';

export interface IContractCollectionPaymentPlanService extends ContractCollectionPaymentPlanService {}

@provide()
export class ContractCollectionPaymentPlanService extends ServiceGenericBase<ContractCollectionPaymentPlanModel> {
  get Model(): any {
    return this.contractCollectionPaymentPlanModel;
  }
  
  @inject()
  contractCollectionPaymentPlanModel: IContractCollectionPaymentPlanModel;

  @inject()
  contractService: IContractService;
  @inject()
  dataDictionaryService: IDataDictionaryService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractCollectionPaymentPlanModel, useOptions?: CreateOptions): Promise<ContractCollectionPaymentPlanModel> {
    const run = async (t: Transaction) => {
      if (values.contractIdObj && !values.contractId) {
        values.contractId = (
          await this.contractService.create(values.contractIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.modeObj && !values.mode) {
        values.mode = (
          await this.dataDictionaryService.create(values.modeObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.typeObj && !values.type) {
        values.type = (
          await this.dataDictionaryService.create(values.typeObj, {
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
