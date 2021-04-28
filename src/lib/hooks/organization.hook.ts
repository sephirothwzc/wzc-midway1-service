import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { BUDGET, BudgetModel } from '../models/budget.model';
import { CONTRACT, ContractModel } from '../models/contract.model';
import { ORGANIZATION, OrganizationModel } from '../models/organization.model';
import { PROJECT_HIS, ProjectHisModel } from '../models/project-his.model';
import { PROJECT, ProjectModel } from '../models/project.model';
import * as Bb from 'bluebird';

@provide('OrganizationHook')
export class OrganizationHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { budgetIbfk1, contractIbfk7, organizationIbfk1, projectHisIbfk5, projectIbfk4 } = await Bb.props({
        budgetIbfk1: BudgetModel.findOne({
          where: {
            [BUDGET.DEPARTMENT]: _.get(model, 'where.id'),
          },
        }),
        contractIbfk7: ContractModel.findOne({
          where: {
            [CONTRACT.ORGANIZATION_ID]: _.get(model, 'where.id'),
          },
        }),
        organizationIbfk1: OrganizationModel.findOne({
          where: {
            [ORGANIZATION.PARENT_ID]: _.get(model, 'where.id'),
          },
        }),
        projectHisIbfk5: ProjectHisModel.findOne({
          where: {
            [PROJECT_HIS.RESPONSIBLE_ORGANIZATION_ID]: _.get(model, 'where.id'),
          },
        }),
        projectIbfk4: ProjectModel.findOne({
          where: {
            [PROJECT.RESPONSIBLE_ORGANIZATION_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (budgetIbfk1 || contractIbfk7 || organizationIbfk1 || projectHisIbfk5 || projectIbfk4) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
