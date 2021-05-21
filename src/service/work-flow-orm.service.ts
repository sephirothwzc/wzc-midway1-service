import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IWorkFlowOrmModel,
  WorkFlowOrmModel,
} from '../lib/models/work-flow-orm.model';
import { IWorkFlowService } from './work-flow.service';
import { IAppUserService } from './app-user.service';
import { SchemaOrmModel } from '../lib/models/schema-orm.model';
import { ISchemaOrm } from '../app/middleware/gql-work-flow';

export interface IWorkFlowOrmService extends WorkFlowOrmService {}

@provide()
export class WorkFlowOrmService extends ServiceGenericBase<WorkFlowOrmModel> {
  get Model(): any {
    return this.workFlowOrmModel;
  }

  @inject()
  workFlowOrmModel: IWorkFlowOrmModel;

  @inject()
  workFlowService: IWorkFlowService;
  @inject()
  appUserService: IAppUserService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: WorkFlowOrmModel,
    useOptions?: CreateOptions
  ): Promise<WorkFlowOrmModel> {
    const run = async (t: Transaction) => {
      if (values.workFlowIdObj && !values.workFlowId) {
        values.workFlowId = (
          await this.workFlowService.create(values.workFlowIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.createWorkIdObj && !values.createWorkId) {
        values.createWorkId = (
          await this.appUserService.create(values.createWorkIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      return super.create(values, {
        transaction: t,
      });
    };
    return await this.useTransaction(run, useOptions);
  }

  /**
   * 关闭之前的记录 当前wfo 的 data status = 旧的 status value，如果多个处理则根据类型处理
   * @param orm
   * @param wfo
   * @param schemaOrm
   * @returns
   */
  public async closeWorkFlowOrm(
    orm: SchemaOrmModel,
    wfo: WorkFlowOrmModel,
    schemaOrm: ISchemaOrm
  ) {
    this.workFlowOrmModel.update(
      { statusValue: wfo.dataStatus },
      {
        where: {
          id: schemaOrm.workFlowOrmId,
        },
      }
    );
    return undefined;
  }
}
