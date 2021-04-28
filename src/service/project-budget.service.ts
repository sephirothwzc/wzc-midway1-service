import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IProjectBudgetModel } from '../lib/models/project-budget.model';

export interface IProjectBudgetService extends ProjectBudgetService {}

@provide()
export class ProjectBudgetService extends ServiceBase {
  get Model(): any {
    return this.projectBudgetModel;
  }
  
  @inject()
  projectBudgetModel: IProjectBudgetModel;
}
