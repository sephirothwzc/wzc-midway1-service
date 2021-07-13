import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  WORK_FLOW_ORM_USER,
  WorkFlowOrmUserModel,
} from '../models/work-flow-orm-user.model';
import * as Bb from 'bluebird';
import { WorkFlowOrmModel } from '../models/work-flow-orm.model';

@provide('WorkFlowOrmHook')
export class WorkFlowOrmHook {
  async beforeDestroy(
    model: WorkFlowOrmModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { workFlowOrmUserIbfk1 } = await Bb.props({
      workFlowOrmUserIbfk1: WorkFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.WORK_FLOW_ORM_ID]: model.get('id'),
        },
      }),
    });
    if (workFlowOrmUserIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }
}
