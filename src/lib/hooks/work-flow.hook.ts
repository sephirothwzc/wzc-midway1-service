import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { WORK_FLOW_ORM, WorkFlowOrmModel } from '../models/work-flow-orm.model';
import * as Bb from 'bluebird';
import { WorkFlowModel, WORK_FLOW } from '../models/work-flow.model';
import { toNumber } from 'lodash';

@provide('WorkFlowHook')
export class WorkFlowHook {
  async beforeDestroy(
    model: WorkFlowModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { workFlowOrmIbfk1 } = await Bb.props({
      workFlowOrmIbfk1: WorkFlowOrmModel.findOne({
        where: {
          [WORK_FLOW_ORM.WORK_FLOW_ID]: model.get('id'),
        },
      }),
    });
    if (workFlowOrmIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }

  async beforeCreate(
    model: WorkFlowModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    !model.version && model.set('version', 1);
    if (!model.get('formCustomId')) {
      throw new Error('formCustomId must require');
    }
    const item0 = await WorkFlowModel.findOne({
      where: {
        [WORK_FLOW.FORM_CUSTOM_ID]: model.get('formCustomId'),
      },
      order: [['version', 'DESC']],
      transaction: options?.transaction,
    });
    item0 && model.set('version', toNumber(item0.get('version')) + 1);
    return model;
  }
}
