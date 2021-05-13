import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IProjectBudgetHisModel, ProjectBudgetHisModel } from '../lib/models/project-budget-his.model';
import { IProjectService } from './project.service';
import { IProjectHisService } from './project-his.service';
import { IBudgetService } from './budget.service';

export interface IProjectBudgetHisService extends ProjectBudgetHisService {}

@provide()
export class ProjectBudgetHisService extends ServiceGenericBase<ProjectBudgetHisModel> {
  get Model(): any {
    return this.projectBudgetHisModel;
  }
  
  @inject()
  projectBudgetHisModel: IProjectBudgetHisModel;

  @inject()
  projectService: IProjectService;
  @inject()
  projectHisService: IProjectHisService;
  @inject()
  budgetService: IBudgetService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ProjectBudgetHisModel, useOptions?: CreateOptions): Promise<ProjectBudgetHisModel> {
    const run = async (t: Transaction) => {
      if (values.projectIdObj && !values.projectId) {
        values.projectId = (
          await this.projectService.create(values.projectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectHisIdObj && !values.projectHisId) {
        values.projectHisId = (
          await this.projectHisService.create(values.projectHisIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.budgetIdObj && !values.budgetId) {
        values.budgetId = (
          await this.budgetService.create(values.budgetIdObj, {
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
