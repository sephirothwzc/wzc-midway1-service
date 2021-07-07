import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  BUDGET_ALLOCATION,
  BudgetAllocationModel,
} from '../models/budget-allocation.model';
import { CONTRACT_HIS, ContractHisModel } from '../models/contract-his.model';
import { CONTRACT, ContractModel } from '../models/contract.model';
import {
  PROJECT_BUDGET_HIS,
  ProjectBudgetHisModel,
} from '../models/project-budget-his.model';
import {
  PROJECT_BUDGET,
  ProjectBudgetModel,
} from '../models/project-budget.model';
import {
  PROJECT_CHANGE_FILE,
  ProjectChangeFileModel,
} from '../models/project-change-file.model';
import {
  PROJECT_CHANGE,
  ProjectChangeModel,
} from '../models/project-change.model';
import {
  PROJECT_FILE_HIS,
  ProjectFileHisModel,
} from '../models/project-file-his.model';
import { PROJECT_FILE, ProjectFileModel } from '../models/project-file.model';
import * as Bb from 'bluebird';
import { PROJECT, ProjectModel } from '../models/project.model';

@provide('ProjectHook')
export class ProjectHook {
  async beforeDestroy(
    model: ProjectModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const {
      budgetAllocationIbfk1,
      budgetAllocationIbfk3,
      contractHisIbfk2,
      contractIbfk1,
      projectBudgetHisIbfk1,
      projectBudgetIbfk1,
      projectChangeFileIbfk2,
      projectChangeIbfk1,
      projectFileHisIbfk1,
      projectFileIbfk1,
    } = await Bb.props({
      budgetAllocationIbfk1: BudgetAllocationModel.findOne({
        where: {
          [BUDGET_ALLOCATION.PROJECT_AID]: model.get('id'),
        },
      }),
      budgetAllocationIbfk3: BudgetAllocationModel.findOne({
        where: {
          [BUDGET_ALLOCATION.PROJECT_BID]: model.get('id'),
        },
      }),
      contractHisIbfk2: ContractHisModel.findOne({
        where: {
          [CONTRACT_HIS.PROJECT_ID]: model.get('id'),
        },
      }),
      contractIbfk1: ContractModel.findOne({
        where: {
          [CONTRACT.PROJECT_ID]: model.get('id'),
        },
      }),
      projectBudgetHisIbfk1: ProjectBudgetHisModel.findOne({
        where: {
          [PROJECT_BUDGET_HIS.PROJECT_ID]: model.get('id'),
        },
      }),
      projectBudgetIbfk1: ProjectBudgetModel.findOne({
        where: {
          [PROJECT_BUDGET.PROJECT_ID]: model.get('id'),
        },
      }),
      projectChangeFileIbfk2: ProjectChangeFileModel.findOne({
        where: {
          [PROJECT_CHANGE_FILE.PROJECT_ID]: model.get('id'),
        },
      }),
      projectChangeIbfk1: ProjectChangeModel.findOne({
        where: {
          [PROJECT_CHANGE.PROJECT_ID]: model.get('id'),
        },
      }),
      projectFileHisIbfk1: ProjectFileHisModel.findOne({
        where: {
          [PROJECT_FILE_HIS.PROJECT_ID]: model.get('id'),
        },
      }),
      projectFileIbfk1: ProjectFileModel.findOne({
        where: {
          [PROJECT_FILE.PROJECT_ID]: model.get('id'),
        },
      }),
    });
    if (
      budgetAllocationIbfk1 ||
      budgetAllocationIbfk3 ||
      contractHisIbfk2 ||
      contractIbfk1 ||
      projectBudgetHisIbfk1 ||
      projectBudgetIbfk1 ||
      projectChangeFileIbfk2 ||
      projectChangeIbfk1 ||
      projectFileHisIbfk1 ||
      projectFileIbfk1
    ) {
      throw new Error('已使用数据禁止删除');
    }
  }

  async beforeUpdate(
    model: ProjectModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(PROJECT.PROJECT_CODE) && model.get('projectCode')) {
      const item0 = await ProjectModel.findOne({
        where: {
          [PROJECT.PROJECT_CODE]: model.get('projectCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('项目编号已存在');
      }
    }
  }

  async beforeCreate(
    model: ProjectModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (model.get('projectCode')) {
      const item0 = await ProjectModel.findOne({
        where: {
          [PROJECT.PROJECT_CODE]: model.get('projectCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('项目编号已存在');
      }
    }
  }
}
