import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IBudgetFileModel } from '../lib/models/budget-file.model';

export interface IBudgetFileService extends BudgetFileService {}

@provide()
export class BudgetFileService extends ServiceBase {
  get Model(): any {
    return this.budgetFileModel;
  }
  
  @inject()
  budgetFileModel: IBudgetFileModel;
}
