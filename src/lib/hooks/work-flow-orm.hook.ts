import * as _ from 'lodash';
import { Application } from 'midway-web';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { WorkFlowOrmModel } from '../models/work-flow-orm.model';
import { IBaseModel } from '../base/model.base';

@provide('WorkFlowOrmHook')
export class WorkFlowOrmHook {
  async beforeDestroy(
    model: WorkFlowOrmModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const app = _.get(WorkFlowOrmModel.sequelize, 'app') as Application;
    const itemModel: IBaseModel = await app.applicationContext.getAsync(
      model.get('ormType') + 'Model'
    );
    itemModel.findByPk(model.get('ormId')).then((result) => {
      result.destroy(options);
    });
  }
}
