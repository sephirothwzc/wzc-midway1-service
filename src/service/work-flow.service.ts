import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IWorkFlowModel, WorkFlowModel } from '../lib/models/work-flow.model';
import { IFormCustomService } from './form-custom.service';

export interface IWorkFlowService extends WorkFlowService {}

@provide()
export class WorkFlowService extends ServiceGenericBase<WorkFlowModel> {
  get Model(): any {
    return this.workFlowModel;
  }
  
  @inject()
  workFlowModel: IWorkFlowModel;

  @inject()
  formCustomService: IFormCustomService;
  /**
   * 新增
   * @param values
   */
  public async create(values: WorkFlowModel, useOptions?: CreateOptions): Promise<WorkFlowModel> {
    const run = async (t: Transaction) => {
      if (values.formCustomIdObj && !values.formCustomId) {
        values.formCustomId = (
          await this.formCustomService.create(values.formCustomIdObj, {
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
