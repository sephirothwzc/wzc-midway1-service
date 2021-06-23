import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractCollectionPaymentFileModel, ContractCollectionPaymentFileModel } from '../lib/models/contract-collection-payment-file.model';
import { IContractCollectionPaymentService } from './contract-collection-payment.service';

export interface IContractCollectionPaymentFileService extends ContractCollectionPaymentFileService {}

@provide()
export class ContractCollectionPaymentFileService extends ServiceGenericBase<ContractCollectionPaymentFileModel> {
  get Model(): any {
    return this.contractCollectionPaymentFileModel;
  }
  
  @inject()
  contractCollectionPaymentFileModel: IContractCollectionPaymentFileModel;

  @inject()
  contractCollectionPaymentService: IContractCollectionPaymentService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractCollectionPaymentFileModel, useOptions?: CreateOptions): Promise<ContractCollectionPaymentFileModel> {
    const run = async (t: Transaction) => {
      if (values.contractCollectionPaymentIdObj && !values.contractCollectionPaymentId) {
        values.contractCollectionPaymentId = (
          await this.contractCollectionPaymentService.create(values.contractCollectionPaymentIdObj, {
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
