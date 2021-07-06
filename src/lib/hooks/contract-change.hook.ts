import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  CONTRACT_CHANGE_FILE,
  ContractChangeFileModel,
} from '../models/contract-change-file.model';
import * as Bb from 'bluebird';
import { ContractChangeModel } from '../models/contract-change.model';

@provide('ContractChangeHook')
export class ContractChangeHook {
  async beforeDestroy(
    model: ContractChangeModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { contractChangeFileIbfk1 } = await Bb.props({
      contractChangeFileIbfk1: ContractChangeFileModel.findOne({
        where: {
          [CONTRACT_CHANGE_FILE.CONTRACT_CHANGE_ID]: model.get('id'),
        },
      }),
    });
    if (contractChangeFileIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }
}
