import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { CONTRACT, ContractModel } from '../models/contract.model';
import { PROJECT_BUDGET_HIS, ProjectBudgetHisModel } from '../models/project-budget-his.model';
import { PROJECT_BUDGET, ProjectBudgetModel } from '../models/project-budget.model';
import { PROJECT_FILE_HIS, ProjectFileHisModel } from '../models/project-file-his.model';
import { PROJECT_FILE, ProjectFileModel } from '../models/project-file.model';
import { PROJECT_HIS, ProjectHisModel } from '../models/project-his.model';
import * as Bb from 'bluebird';
import { PROJECT, ProjectModel } from '../models/project.model';

@provide('ProjectHook')
export class ProjectHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { contractIbfk1, projectBudgetHisIbfk1, projectBudgetIbfk1, projectFileHisIbfk1, projectFileIbfk1, projectHisIbfk1 } = await Bb.props({
        contractIbfk1: ContractModel.findOne({
          where: {
            [CONTRACT.PROJECT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectBudgetHisIbfk1: ProjectBudgetHisModel.findOne({
          where: {
            [PROJECT_BUDGET_HIS.PROJECT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectBudgetIbfk1: ProjectBudgetModel.findOne({
          where: {
            [PROJECT_BUDGET.PROJECT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectFileHisIbfk1: ProjectFileHisModel.findOne({
          where: {
            [PROJECT_FILE_HIS.PROJECT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectFileIbfk1: ProjectFileModel.findOne({
          where: {
            [PROJECT_FILE.PROJECT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectHisIbfk1: ProjectHisModel.findOne({
          where: {
            [PROJECT_HIS.PROJECT_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (contractIbfk1 || projectBudgetHisIbfk1 || projectBudgetIbfk1 || projectFileHisIbfk1 || projectFileIbfk1 || projectHisIbfk1) {
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

    if (changed.includes(PROJECT.PROJECT_CODE) && model.get('ProjectCode')) {
      const item0 = await ProjectModel.findOne({
        where: {
          [PROJECT.PROJECT_CODE]: model.get('ProjectCode'),
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

    if (model.get('ProjectCode')) {
      const item0 = await ProjectModel.findOne({
        where: {
          [PROJECT.PROJECT_CODE]: model.get('ProjectCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('项目编号已存在');
      }
    }
    
  }
  
}
