import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IWorkFlowOrmUserModel, WorkFlowOrmUserModel } from '../lib/models/work-flow-orm-user.model';
import { IWorkFlowOrmService } from './work-flow-orm.service';
import { IAppUserService } from './app-user.service';

export interface IWorkFlowOrmUserService extends WorkFlowOrmUserService {}

@provide()
export class WorkFlowOrmUserService extends ServiceGenericBase<WorkFlowOrmUserModel> {
  get Model(): any {
    return this.workFlowOrmUserModel;
  }
  
  @inject()
  workFlowOrmUserModel: IWorkFlowOrmUserModel;

  @inject()
  workFlowOrmService: IWorkFlowOrmService;
  @inject()
  appUserService: IAppUserService;
  /**
   * 新增
   * @param values
   */
  public async create(values: WorkFlowOrmUserModel, useOptions?: CreateOptions): Promise<WorkFlowOrmUserModel> {
    const run = async (t: Transaction) => {
      if (values.workFlowOrmIdObj && !values.workFlowOrmId) {
        values.workFlowOrmId = (
          await this.workFlowOrmService.create(values.workFlowOrmIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.formUserIdObj && !values.formUserId) {
        values.formUserId = (
          await this.appUserService.create(values.formUserIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.handleUserIdObj && !values.handleUserId) {
        values.handleUserId = (
          await this.appUserService.create(values.handleUserIdObj, {
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
  
}
