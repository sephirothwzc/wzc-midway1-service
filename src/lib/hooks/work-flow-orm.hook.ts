import * as _ from 'lodash';
import { Application } from 'midway-web';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { WorkFlowOrmModel } from '../models/work-flow-orm.model';

@provide('WorkFlowOrmHook')
export class WorkFlowOrmHook {
  async beforeBulkDestroy(model: {
    where: { id: string };
    transaction: Transaction;
  }) {
    const item = await WorkFlowOrmModel.findByPk(model.where.id);
    if (item) {
      const app = _.get(WorkFlowOrmModel.sequelize, 'app') as Application;
      const model = app.applicationContext.getAsync(
        item.get('ormType') + 'Model'
      );
      console.log(model);
      throw new Error(model);
    }
  }
}
