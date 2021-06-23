import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT_COLLECTION_PAYMENT_FILE, ContractCollectionPaymentFileModel } from '../models/contract-collection-payment-file.model';
import * as Bb from 'bluebird';
import { ContractCollectionPaymentModel } from '../models/contract-collection-payment.model';

@provide('ContractCollectionPaymentHook')
export class ContractCollectionPaymentHook {

  async beforeDestroy(
    model: ContractCollectionPaymentModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { contractCollectionPaymentFileIbfk1 } = await Bb.props({
        contractCollectionPaymentFileIbfk1: ContractCollectionPaymentFileModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_FILE.CONTRACT_COLLECTION_PAYMENT_ID]: model.get('id'),
          },
        }),
    });
    if (contractCollectionPaymentFileIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
