import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IBudgetModel } from '../lib/models/budget.model';

export interface IBudgetService extends BudgetService {}

@provide()
export class BudgetService extends ServiceBase {
  get Model(): any {
    return this.budgetModel;
  }
  
  @inject()
  budgetModel: IBudgetModel;
}
