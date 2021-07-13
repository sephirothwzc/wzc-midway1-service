import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { WORK_FLOW_ORM, WorkFlowOrmModel } from '../models/work-flow-orm.model';
import * as Bb from 'bluebird';
import { WorkFlowModel } from '../models/work-flow.model';

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


}
