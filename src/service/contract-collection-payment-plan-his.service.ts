import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IContractCollectionPaymentPlanHisModel,
  ContractCollectionPaymentPlanHisModel,
} from '../lib/models/contract-collection-payment-plan-his.model';
import { IContractHisService } from './contract-his.service';
import { IContractCollectionPaymentPlanService } from './contract-collection-payment-plan.service';
import { IContractService } from './contract.service';
import { IDataDictionaryService } from './data-dictionary.service';

export interface IContractCollectionPaymentPlanHisService
  extends ContractCollectionPaymentPlanHisService {}

@provide()
export class ContractCollectionPaymentPlanHisService extends ServiceGenericBase<ContractCollectionPaymentPlanHisModel> {
  get Model(): any {
    return this.contractCollectionPaymentPlanHisModel;
  }

  @inject()
  contractCollectionPaymentPlanHisModel: IContractCollectionPaymentPlanHisModel;

  @inject()
  contractHisService: IContractHisService;
  @inject()
  contractCollectionPaymentPlanService: IContractCollectionPaymentPlanService;
  @inject()
  contractService: IContractService;
  @inject()
  dataDictionaryService: IDataDictionaryService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: ContractCollectionPaymentPlanHisModel,
    useOptions?: CreateOptions
  ): Promise<ContractCollectionPaymentPlanHisModel> {
    const run = async (t: Transaction) => {
      if (values.contractHisIdObj && !values.contractHisId) {
        values.contractHisId = (
          await this.contractHisService.create(values.contractHisIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (
        values.contractCollectionPaymentPlanIdObj &&
        !values.contractCollectionPaymentPlanId
      ) {
        values.contractCollectionPaymentPlanId = (
          await this.contractCollectionPaymentPlanService.create(
            values.contractCollectionPaymentPlanIdObj,
            {
              transaction: t,
            }
          )
        ).get('id');
      }
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
