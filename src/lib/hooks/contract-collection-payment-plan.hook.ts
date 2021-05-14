import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT_COLLECTION_PAYMENT, ContractCollectionPaymentModel } from '../models/contract-collection-payment.model';
import * as Bb from 'bluebird';
import { ContractCollectionPaymentPlanModel } from '../models/contract-collection-payment-plan.model';

@provide('ContractCollectionPaymentPlanHook')
export class ContractCollectionPaymentPlanHook {

  async beforeDestroy(
    model: ContractCollectionPaymentPlanModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { contractCollectionPaymentIbfk2 } = await Bb.props({
        contractCollectionPaymentIbfk2: ContractCollectionPaymentModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT.CONTRACT_COLLECTION_PLAN_ID]: model.get('id'),
          },
        }),
    });
    if (contractCollectionPaymentIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
