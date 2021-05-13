import { provide, inject } from 'midway';
import { Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IProjectBudgetModel,
  ProjectBudgetModel,
} from '../lib/models/project-budget.model';
import { IBudgetService } from './budget.service';
import { IProjectService } from './project.service';

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
  public async create(values: ProjectBudgetModel): Promise<ProjectBudgetModel> {
    return await this.db.sequelize.transaction(async (t: Transaction) => {
      if (values.projectIdObj && !values.projectId) {
        values.projectId = (
          await this.projectService.create(values.projectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.budgetIdObj && !values.budgetId) {
        values.projectId = (
          await this.budgetService.create(values.projectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      return super.create(values, {
        transaction: t,
      });
    });
  }
}
