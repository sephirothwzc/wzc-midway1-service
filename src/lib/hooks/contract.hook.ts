import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  CONTRACT_CHANGE_FILE,
  ContractChangeFileModel,
} from '../models/contract-change-file.model';
import {
  CONTRACT_CHANGE,
  ContractChangeModel,
} from '../models/contract-change.model';
import {
  CONTRACT_COLLECTION_PAYMENT_HIS,
  ContractCollectionPaymentHisModel,
} from '../models/contract-collection-payment-his.model';
import {
  CONTRACT_COLLECTION_PAYMENT,
  ContractCollectionPaymentModel,
} from '../models/contract-collection-payment.model';
import {
  CONTRACT_COLLECTION_PAYMENT_PLAN_HIS,
  ContractCollectionPaymentPlanHisModel,
} from '../models/contract-collection-payment-plan-his.model';
import {
  CONTRACT_COLLECTION_PAYMENT_PLAN,
  ContractCollectionPaymentPlanModel,
} from '../models/contract-collection-payment-plan.model';
import {
  CONTRACT_FILE_HIS,
  ContractFileHisModel,
} from '../models/contract-file-his.model';
import {
  CONTRACT_FILE,
  ContractFileModel,
} from '../models/contract-file.model';
import { CONTRACT_HIS, ContractHisModel } from '../models/contract-his.model';
import {
  CONTRACT_MEETING_HIS,
  ContractMeetingHisModel,
} from '../models/contract-meeting-his.model';
import {
  CONTRACT_MEETING,
  ContractMeetingModel,
} from '../models/contract-meeting.model';
import {
  CONTRACT_SIGN_HIS,
  ContractSignHisModel,
} from '../models/contract-sign-his.model';
import {
  CONTRACT_SIGN,
  ContractSignModel,
} from '../models/contract-sign.model';
import * as Bb from 'bluebird';
import { CONTRACT, ContractModel } from '../models/contract.model';

@provide('ContractHook')
export class ContractHook {
  async beforeDestroy(
    model: ContractModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const {
      contractChangeFileIbfk2,
      contractChangeIbfk1,
      contractCollectionPaymentHisIbfk2,
      contractCollectionPaymentIbfk1,
      contractCollectionPaymentPlanHisIbfk2,
      contractCollectionPaymentPlanIbfk1,
      contractFileHisIbfk2,
      contractFileIbfk1,
      contractHisIbfk1,
      contractMeetingHisIbfk2,
      contractMeetingIbfk1,
      contractSignHisIbfk2,
      contractSignIbfk1,
    } = await Bb.props({
      contractChangeFileIbfk2: ContractChangeFileModel.findOne({
        where: {
          [CONTRACT_CHANGE_FILE.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractChangeIbfk1: ContractChangeModel.findOne({
        where: {
          [CONTRACT_CHANGE.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractCollectionPaymentHisIbfk2:
        ContractCollectionPaymentHisModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_HIS.CONTRACT_ID]: model.get('id'),
          },
        }),
      contractCollectionPaymentIbfk1: ContractCollectionPaymentModel.findOne({
        where: {
          [CONTRACT_COLLECTION_PAYMENT.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractCollectionPaymentPlanHisIbfk2:
        ContractCollectionPaymentPlanHisModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_PLAN_HIS.CONTRACT_ID]: model.get('id'),
          },
        }),
      contractCollectionPaymentPlanIbfk1:
        ContractCollectionPaymentPlanModel.findOne({
          where: {
            [CONTRACT_COLLECTION_PAYMENT_PLAN.CONTRACT_ID]: model.get('id'),
          },
        }),
      contractFileHisIbfk2: ContractFileHisModel.findOne({
        where: {
          [CONTRACT_FILE_HIS.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractFileIbfk1: ContractFileModel.findOne({
        where: {
          [CONTRACT_FILE.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractHisIbfk1: ContractHisModel.findOne({
        where: {
          [CONTRACT_HIS.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractMeetingHisIbfk2: ContractMeetingHisModel.findOne({
        where: {
          [CONTRACT_MEETING_HIS.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractMeetingIbfk1: ContractMeetingModel.findOne({
        where: {
          [CONTRACT_MEETING.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractSignHisIbfk2: ContractSignHisModel.findOne({
        where: {
          [CONTRACT_SIGN_HIS.CONTRACT_ID]: model.get('id'),
        },
      }),
      contractSignIbfk1: ContractSignModel.findOne({
        where: {
          [CONTRACT_SIGN.CONTRACT_ID]: model.get('id'),
        },
      }),
    });
    if (
      contractChangeFileIbfk2 ||
      contractChangeIbfk1 ||
      contractCollectionPaymentHisIbfk2 ||
      contractCollectionPaymentIbfk1 ||
      contractCollectionPaymentPlanHisIbfk2 ||
      contractCollectionPaymentPlanIbfk1 ||
      contractFileHisIbfk2 ||
      contractFileIbfk1 ||
      contractHisIbfk1 ||
      contractMeetingHisIbfk2 ||
      contractMeetingIbfk1 ||
      contractSignHisIbfk2 ||
      contractSignIbfk1
    ) {
      throw new Error('已使用数据禁止删除');
    }
  }

  async beforeUpdate(
    model: ContractModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(CONTRACT.CONTRACT_CODE) && model.get('contractCode')) {
      const item0 = await ContractModel.findOne({
        where: {
          [CONTRACT.CONTRACT_CODE]: model.get('contractCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('合同编号已存在');
      }
    }

    if (changed.includes(CONTRACT.CONTRACT_NAME) && model.get('contractName')) {
      const item1 = await ContractModel.findOne({
        where: {
          [CONTRACT.CONTRACT_NAME]: model.get('contractName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('合同名称已存在');
      }
    }
  }

  async beforeCreate(
    model: ContractModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (model.get('contractCode')) {
      const item0 = await ContractModel.findOne({
        where: {
          [CONTRACT.CONTRACT_CODE]: model.get('contractCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('合同编号已存在');
      }
    }

    if (model.get('contractName')) {
      const item1 = await ContractModel.findOne({
        where: {
          [CONTRACT.CONTRACT_NAME]: model.get('contractName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('合同名称已存在');
      }
    }
  }
}
