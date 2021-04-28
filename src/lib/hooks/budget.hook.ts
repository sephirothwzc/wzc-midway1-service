import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { BUDGET_FILE, BudgetFileModel } from '../models/budget-file.model';
import { CONTRACT, ContractModel } from '../models/contract.model';
import { PROJECT_BUDGET_HIS, ProjectBudgetHisModel } from '../models/project-budget-his.model';
import { PROJECT_BUDGET, ProjectBudgetModel } from '../models/project-budget.model';
import * as Bb from 'bluebird';
import { BUDGET, BudgetModel } from '../models/budget.model';

@provide('BudgetHook')
export class BudgetHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { budgetFileIbfk1, contractIbfk2, projectBudgetHisIbfk3, projectBudgetIbfk2 } = await Bb.props({
        budgetFileIbfk1: BudgetFileModel.findOne({
          where: {
            [BUDGET_FILE.BUDGET_ID]: _.get(model, 'where.id'),
          },
        }),
        contractIbfk2: ContractModel.findOne({
          where: {
            [CONTRACT.BUDGET_ID]: _.get(model, 'where.id'),
          },
        }),
        projectBudgetHisIbfk3: ProjectBudgetHisModel.findOne({
          where: {
            [PROJECT_BUDGET_HIS.BUDGET_ID]: _.get(model, 'where.id'),
          },
        }),
        projectBudgetIbfk2: ProjectBudgetModel.findOne({
          where: {
            [PROJECT_BUDGET.BUDGET_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (budgetFileIbfk1 || contractIbfk2 || projectBudgetHisIbfk3 || projectBudgetIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


  async beforeUpdate(
    model: BudgetModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(BUDGET.BUDGET_CODE) && model.get('BudgetCode')) {
      const item0 = await BudgetModel.findOne({
        where: {
          [BUDGET.BUDGET_CODE]: model.get('BudgetCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('预算编号已存在');
      }
    }
    
  }

  async beforeCreate(
    model: BudgetModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('BudgetCode')) {
      const item0 = await BudgetModel.findOne({
        where: {
          [BUDGET.BUDGET_CODE]: model.get('BudgetCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('预算编号已存在');
      }
    }
    
  }
  
}
