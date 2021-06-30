import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IBudgetAllocationModel, BudgetAllocationModel } from '../lib/models/budget-allocation.model';
import { IProjectService } from './project.service';
import { IBudgetService } from './budget.service';

export interface IBudgetAllocationService extends BudgetAllocationService {}

@provide()
export class BudgetAllocationService extends ServiceGenericBase<BudgetAllocationModel> {
  get Model(): any {
    return this.budgetAllocationModel;
  }
  
  @inject()
  budgetAllocationModel: IBudgetAllocationModel;

  @inject()
  projectService: IProjectService;
  @inject()
  budgetService: IBudgetService;
  /**
   * 新增
   * @param values
   */
  public async create(values: BudgetAllocationModel, useOptions?: CreateOptions): Promise<BudgetAllocationModel> {
    const run = async (t: Transaction) => {
      if (values.projectAidObj && !values.projectAid) {
        values.projectAid = (
          await this.projectService.create(values.projectAidObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.budgetAidObj && !values.budgetAid) {
        values.budgetAid = (
          await this.budgetService.create(values.budgetAidObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectBidObj && !values.projectBid) {
        values.projectBid = (
          await this.projectService.create(values.projectBidObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.budgetBidObj && !values.budgetBid) {
        values.budgetBid = (
          await this.budgetService.create(values.budgetBidObj, {
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
