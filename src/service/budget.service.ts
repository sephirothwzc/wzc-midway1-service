import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IBudgetModel, BudgetModel } from '../lib/models/budget.model';
import { IOrganizationService } from './organization.service';

export interface IBudgetService extends BudgetService {}

@provide()
export class BudgetService extends ServiceGenericBase<BudgetModel> {
  get Model(): any {
    return this.budgetModel;
  }
  
  @inject()
  budgetModel: IBudgetModel;

  @inject()
  organizationService: IOrganizationService;
  /**
   * 新增
   * @param values
   */
  public async create(values: BudgetModel, useOptions?: CreateOptions): Promise<BudgetModel> {
    const run = async (t: Transaction) => {
      if (values.departmentObj && !values.department) {
        values.department = (
          await this.organizationService.create(values.departmentObj, {
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
