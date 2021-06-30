import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { BUDGET, BudgetModel } from '../models/budget.model';
import * as Bb from 'bluebird';
import { BudgetAllocationModel } from '../models/budget-allocation.model';

@provide('BudgetAllocationHook')
export class BudgetAllocationHook {

  async beforeDestroy(
    model: BudgetAllocationModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { budgetBudgetAllocationIdForeignIdx } = await Bb.props({
        budgetBudgetAllocationIdForeignIdx: BudgetModel.findOne({
          where: {
            [BUDGET.BUDGET_ALLOCATION_ID]: model.get('id'),
          },
        }),
    });
    if (budgetBudgetAllocationIdForeignIdx) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
