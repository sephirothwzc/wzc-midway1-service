import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IProjectBudgetHisModel } from '../lib/models/project-budget-his.model';

export interface IProjectBudgetHisService extends ProjectBudgetHisService {}

@provide()
export class ProjectBudgetHisService extends ServiceBase {
  get Model(): any {
    return this.projectBudgetHisModel;
  }
  
  @inject()
  projectBudgetHisModel: IProjectBudgetHisModel;
}
