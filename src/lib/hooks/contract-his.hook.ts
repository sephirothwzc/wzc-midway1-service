import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT_HIS, ContractHisModel } from '../models/contract-his.model';

@provide('ContractHisHook')
export class ContractHisHook {
  async beforeUpdate(
    model: ContractHisModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (
      changed.includes(CONTRACT_HIS.CONTRACT_CODE) &&
      model.get('contractCode')
    ) {
      const item0 = await ContractHisModel.findOne({
        where: {
          [CONTRACT_HIS.CONTRACT_CODE]: model.get('contractCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('合同编号已存在');
      }
    }

    if (
      changed.includes(CONTRACT_HIS.CONTRACT_NAME) &&
      model.get('contractName')
    ) {
      const item1 = await ContractHisModel.findOne({
        where: {
          [CONTRACT_HIS.CONTRACT_NAME]: model.get('contractName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('合同名称已存在');
      }
    }
  }

  async beforeCreate(
    model: ContractHisModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (model.get('contractCode')) {
      const item0 = await ContractHisModel.findOne({
        where: {
          [CONTRACT_HIS.CONTRACT_CODE]: model.get('contractCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('合同编号已存在');
      }
    }

    if (model.get('contractName')) {
      const item1 = await ContractHisModel.findOne({
        where: {
          [CONTRACT_HIS.CONTRACT_NAME]: model.get('contractName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('合同名称已存在');
      }
    }
  }
}
