import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { WORK_FLOW_ORM, WorkFlowOrmModel } from '../models/work-flow-orm.model';
import * as Bb from 'bluebird';

@provide('WorkFlowHook')
export class WorkFlowHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { workFlowOrmIbfk1 } = await Bb.props({
        workFlowOrmIbfk1: WorkFlowOrmModel.findOne({
          where: {
            [WORK_FLOW_ORM.WORK_FLOW_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (workFlowOrmIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
