import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IProjectBudgetModel,
  ProjectBudgetModel,
} from '../lib/models/project-budget.model';
import { IProjectService } from './project.service';
import { IBudgetService } from './budget.service';

export interface IProjectBudgetService extends ProjectBudgetService {}

@provide()
export class ProjectBudgetService extends ServiceGenericBase<ProjectBudgetModel> {
  get Model(): any {
    return this.projectBudgetModel;
  }

  @inject()
  projectBudgetModel: IProjectBudgetModel;

  @inject()
  projectService: IProjectService;
  @inject()
  budgetService: IBudgetService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: ProjectBudgetModel,
    useOptions?: CreateOptions
  ): Promise<ProjectBudgetModel> {
    const run = async (t: Transaction) => {
      if (values.projectIdObj && !values.projectId) {
        values.projectId = (
          await this.projectService.create(values.projectIdObj, {
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
