import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT_COLLECTION_PAYMENT, ContractCollectionPaymentModel } from '../models/contract-collection-payment.model';
import * as Bb from 'bluebird';

@provide('CapitalAccountHook')
export class CapitalAccountHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { contractCollectionPaymentIbfk3, contractCollectionPaymentIbfk4 } = await Bb.props({
        contractCollectionPaymentIbfk3: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.COLLECTION_ACCOUNT_ID]: _.get(model, 'where.id'),
          },
        }),
        contractCollectionPaymentIbfk4: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.PAYMENT_ACCOUNT_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (contractCollectionPaymentIbfk3 || contractCollectionPaymentIbfk4) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
