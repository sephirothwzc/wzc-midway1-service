import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT_COLLECTION_PAYMENT, ContractCollectionPaymentModel } from '../models/contract-collection-payment.model';
import * as Bb from 'bluebird';
import { CapitalAccountModel } from '../models/capital-account.model';

@provide('CapitalAccountHook')
export class CapitalAccountHook {

  async beforeDestroy(
    model: CapitalAccountModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { contractCollectionPaymentIbfk3, contractCollectionPaymentIbfk4 } = await Bb.props({
        contractCollectionPaymentIbfk3: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.COLLECTION_ACCOUNT_ID]: model.get('id'),
          },
        }),
        contractCollectionPaymentIbfk4: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.PAYMENT_ACCOUNT_ID]: model.get('id'),
          },
        }),
    });
    if (contractCollectionPaymentIbfk3 || contractCollectionPaymentIbfk4) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
