import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT_COLLECTION_PAYMENT, ContractCollectionPaymentModel } from '../models/contract-collection-payment.model';
import * as Bb from 'bluebird';

@provide('ContractCollectionPaymentPlanHook')
export class ContractCollectionPaymentPlanHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { contractCollectionPaymentIbfk2 } = await Bb.props({
        contractCollectionPaymentIbfk2: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.CONTRACT_COLLECTION_PLAN_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (contractCollectionPaymentIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
