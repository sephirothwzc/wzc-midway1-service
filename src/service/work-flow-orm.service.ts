import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IWorkFlowOrmModel, WorkFlowOrmModel } from '../lib/models/work-flow-orm.model';
import { IWorkFlowService } from './work-flow.service';
import { IAppUserService } from './app-user.service';

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
  public async create(values: WorkFlowOrmModel, useOptions?: CreateOptions): Promise<WorkFlowOrmModel> {
    const run = async (t: Transaction) => {
      if (values.workFlowIdObj && !values.workFlowId) {
        values.workFlowId = (
          await this.workFlowService.create(values.workFlowIdObj, {
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
      if (values.managerUserIdObj && !values.managerUserId) {
        values.managerUserId = (
          await this.appUserService.create(values.managerUserIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.undertakeUserIdObj && !values.undertakeUserId) {
        values.undertakeUserId = (
          await this.appUserService.create(values.undertakeUserIdObj, {
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
