import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IBudgetFileModel, BudgetFileModel } from '../lib/models/budget-file.model';
import { IBudgetService } from './budget.service';

export interface IBudgetFileService extends BudgetFileService {}

@provide()
export class BudgetFileService extends ServiceGenericBase<BudgetFileModel> {
  get Model(): any {
    return this.budgetFileModel;
  }
  
  @inject()
  budgetFileModel: IBudgetFileModel;

  @inject()
  budgetService: IBudgetService;
  /**
   * 新增
   * @param values
   */
  public async create(values: BudgetFileModel, useOptions?: CreateOptions): Promise<BudgetFileModel> {
    const run = async (t: Transaction) => {
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
