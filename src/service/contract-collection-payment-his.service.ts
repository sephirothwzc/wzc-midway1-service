import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IContractCollectionPaymentHisModel,
  ContractCollectionPaymentHisModel,
} from '../lib/models/contract-collection-payment-his.model';
import { IContractHisService } from './contract-his.service';
import { IContractCollectionPaymentService } from './contract-collection-payment.service';
import { IContractService } from './contract.service';
import { IContractCollectionPaymentPlanService } from './contract-collection-payment-plan.service';
import { ICapitalAccountService } from './capital-account.service';
import { IDataDictionaryService } from './data-dictionary.service';

export interface IContractCollectionPaymentHisService
  extends ContractCollectionPaymentHisService {}

@provide()
export class ContractCollectionPaymentHisService extends ServiceGenericBase<ContractCollectionPaymentHisModel> {
  get Model(): any {
    return this.contractCollectionPaymentHisModel;
  }

  @inject()
  contractCollectionPaymentHisModel: IContractCollectionPaymentHisModel;

  @inject()
  contractHisService: IContractHisService;
  @inject()
  contractCollectionPaymentService: IContractCollectionPaymentService;
  @inject()
  contractService: IContractService;
  @inject()
  contractCollectionPaymentPlanService: IContractCollectionPaymentPlanService;
  @inject()
  capitalAccountService: ICapitalAccountService;
  @inject()
  dataDictionaryService: IDataDictionaryService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: ContractCollectionPaymentHisModel,
    useOptions?: CreateOptions
  ): Promise<ContractCollectionPaymentHisModel> {
    const run = async (t: Transaction) => {
      if (values.contractHisIdObj && !values.contractHisId) {
        values.contractHisId = (
          await this.contractHisService.create(values.contractHisIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (
        values.contractCollectionPaymentIdObj &&
        !values.contractCollectionPaymentId
      ) {
        values.contractCollectionPaymentId = (
          await this.contractCollectionPaymentService.create(
            values.contractCollectionPaymentIdObj,
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
      if (
        values.contractCollectionPlanIdObj &&
        !values.contractCollectionPlanId
      ) {
        values.contractCollectionPlanId = (
          await this.contractCollectionPaymentPlanService.create(
            values.contractCollectionPlanIdObj,
            {
              transaction: t,
            }
          )
        ).get('id');
      }
      if (values.collectionAccountIdObj && !values.collectionAccountId) {
        values.collectionAccountId = (
          await this.capitalAccountService.create(
            values.collectionAccountIdObj,
            {
              transaction: t,
            }
          )
        ).get('id');
      }
      if (values.paymentAccountIdObj && !values.paymentAccountId) {
        values.paymentAccountId = (
          await this.capitalAccountService.create(values.paymentAccountIdObj, {
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
