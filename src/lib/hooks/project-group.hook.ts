import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { PROJECT_HIS, ProjectHisModel } from '../models/project-his.model';
import { PROJECT, ProjectModel } from '../models/project.model';
import * as Bb from 'bluebird';
import { PROJECT_GROUP, ProjectGroupModel } from '../models/project-group.model';

@provide('ProjectGroupHook')
export class ProjectGroupHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { projectHisIbfk2, projectIbfk1 } = await Bb.props({
        projectHisIbfk2: ProjectHisModel.findOne({
          where: {
            [PROJECT_HIS.PROJECT_GROUP_ID]: _.get(model, 'where.id'),
          },
        }),
        projectIbfk1: ProjectModel.findOne({
          where: {
            [PROJECT.PROJECT_GROUP_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (projectHisIbfk2 || projectIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }


  async beforeUpdate(
    model: ProjectGroupModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(PROJECT_GROUP.PROJECT_GROUP_CODE) && model.get('ProjectGroupCode')) {
      const item0 = await ProjectGroupModel.findOne({
        where: {
          [PROJECT_GROUP.PROJECT_GROUP_CODE]: model.get('ProjectGroupCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('项目组编号已存在');
      }
    }
    
  }

  async beforeCreate(
    model: ProjectGroupModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('ProjectGroupCode')) {
      const item0 = await ProjectGroupModel.findOne({
        where: {
          [PROJECT_GROUP.PROJECT_GROUP_CODE]: model.get('ProjectGroupCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('项目组编号已存在');
      }
    }
    
  }
  
}
