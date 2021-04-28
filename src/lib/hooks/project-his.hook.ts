import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { PROJECT_BUDGET_HIS, ProjectBudgetHisModel } from '../models/project-budget-his.model';
import { PROJECT_FILE_HIS, ProjectFileHisModel } from '../models/project-file-his.model';
import * as Bb from 'bluebird';

@provide('ProjectHisHook')
export class ProjectHisHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { projectBudgetHisIbfk2, projectFileHisIbfk2 } = await Bb.props({
        projectBudgetHisIbfk2: ProjectBudgetHisModel.findOne({
          where: {
            [PROJECT_BUDGET_HIS.PROJECT_HIS_ID]: _.get(model, 'where.id'),
          },
        }),
        projectFileHisIbfk2: ProjectFileHisModel.findOne({
          where: {
            [PROJECT_FILE_HIS.PROJECT_HIS_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (projectBudgetHisIbfk2 || projectFileHisIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
