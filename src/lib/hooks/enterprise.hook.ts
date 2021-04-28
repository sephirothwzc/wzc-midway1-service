import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CAPITAL_ACCOUNT, CapitalAccountModel } from '../models/capital-account.model';
import { CONTRACT_SIGN, ContractSignModel } from '../models/contract-sign.model';
import * as Bb from 'bluebird';

@provide('EnterpriseHook')
export class EnterpriseHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { capitalAccountIbfk1, contractSignIbfk2 } = await Bb.props({
        capitalAccountIbfk1: CapitalAccountModel.findOne({
          where: {
            [CAPITAL_ACCOUNT.ENTERPRISE_ID]: _.get(model, 'where.id'),
          },
        }),
        contractSignIbfk2: ContractSignModel.findOne({
          where: {
            [CONTRACT_SIGN.ENTERPRISE_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (capitalAccountIbfk1 || contractSignIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
