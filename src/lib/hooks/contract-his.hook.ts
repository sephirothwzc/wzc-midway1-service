import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  CONTRACT_COLLECTION_PAYMENT_HIS,
  ContractCollectionPaymentHisModel,
} from '../models/contract-collection-payment-his.model';
import {
  CONTRACT_COLLECTION_PAYMENT_PLAN_HIS,
  ContractCollectionPaymentPlanHisModel,
} from '../models/contract-collection-payment-plan-his.model';
import {
  CONTRACT_FILE_HIS,
  ContractFileHisModel,
} from '../models/contract-file-his.model';
import {
  CONTRACT_MEETING_HIS,
  ContractMeetingHisModel,
} from '../models/contract-meeting-his.model';
import {
  CONTRACT_SIGN_HIS,
  ContractSignHisModel,
} from '../models/contract-sign-his.model';
import * as Bb from 'bluebird';
import { ContractHisModel } from '../models/contract-his.model';

@provide('ContractHisHook')
export class ContractHisHook {
  async beforeDestroy(
    model: ContractHisModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const {
      contractCollectionPaymentHisContractHisIdForeignIdx,
      contractCollectionPaymentPlanHisContractHisIdForeignIdx,
      contractFileHisContractHisIdForeignIdx,
      contractMeetingHisContractHisIdForeignIdx,
      contractSignHisContractHisIdForeignIdx,
    } = await Bb.props({
      contractCollectionPaymentHisContractHisIdForeignIdx:
        ContractCollectionPaymentHisModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_HIS.CONTRACT_HIS_ID]: model.get('id'),
          },
        }),
      contractCollectionPaymentPlanHisContractHisIdForeignIdx:
        ContractCollectionPaymentPlanHisModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_PLAN_HIS.CONTRACT_HIS_ID]:
              model.get('id'),
          },
        }),
      contractFileHisContractHisIdForeignIdx: ContractFileHisModel.findOne({
        where: {
          [CONTRACT_FILE_HIS.CONTRACT_HIS_ID]: model.get('id'),
        },
      }),
      contractMeetingHisContractHisIdForeignIdx:
        ContractMeetingHisModel.findOne({
          where: {
            [CONTRACT_MEETING_HIS.CONTRACT_HIS_ID]: model.get('id'),
          },
        }),
      contractSignHisContractHisIdForeignIdx: ContractSignHisModel.findOne({
        where: {
          [CONTRACT_SIGN_HIS.CONTRACT_HIS_ID]: model.get('id'),
        },
      }),
    });
    if (
      contractCollectionPaymentHisContractHisIdForeignIdx ||
      contractCollectionPaymentPlanHisContractHisIdForeignIdx ||
      contractFileHisContractHisIdForeignIdx ||
      contractMeetingHisContractHisIdForeignIdx ||
      contractSignHisContractHisIdForeignIdx
    ) {
      throw new Error('已使用数据禁止删除');
    }
  }

  async beforeUpdate(
    model: ContractHisModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    // if (
    //   changed.includes(CONTRACT_HIS.CONTRACT_CODE) &&
    //   model.get('contractCode')
    // ) {
    //   const item0 = await ContractHisModel.findOne({
    //     where: {
    //       [CONTRACT_HIS.CONTRACT_CODE]: model.get('contractCode'),
    //     },
    //     transaction: options?.transaction,
    //   });
    //   if (item0) {
    //     throw new Error('合同编号已存在');
    //   }
    // }

    // if (
    //   changed.includes(CONTRACT_HIS.CONTRACT_NAME) &&
    //   model.get('contractName')
    // ) {
    //   const item1 = await ContractHisModel.findOne({
    //     where: {
    //       [CONTRACT_HIS.CONTRACT_NAME]: model.get('contractName'),
    //     },
    //     transaction: options?.transaction,
    //   });
    //   if (item1) {
    //     throw new Error('合同名称已存在');
    //   }
    // }
  }

  async beforeCreate(
    model: ContractHisModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    // if (model.get('contractCode')) {
    //   const item0 = await ContractHisModel.findOne({
    //     where: {
    //       [CONTRACT_HIS.CONTRACT_CODE]: model.get('contractCode'),
    //     },
    //     transaction: options?.transaction,
    //   });
    //   if (item0) {
    //     throw new Error('合同编号已存在');
    //   }
    // }
    // if (model.get('contractName')) {
    //   const item1 = await ContractHisModel.findOne({
    //     where: {
    //       [CONTRACT_HIS.CONTRACT_NAME]: model.get('contractName'),
    //     },
    //     transaction: options?.transaction,
    //   });
    //   if (item1) {
    //     throw new Error('合同名称已存在');
    //   }
    // }
  }
}
