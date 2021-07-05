import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { PROJECT_CHANGE_FILE, ProjectChangeFileModel } from '../models/project-change-file.model';
import * as Bb from 'bluebird';
import { ProjectChangeModel } from '../models/project-change.model';

@provide('ProjectChangeHook')
export class ProjectChangeHook {

  async beforeDestroy(
    model: ProjectChangeModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { projectChangeFileIbfk1 } = await Bb.props({
        projectChangeFileIbfk1: ProjectChangeFileModel.findOne({
          where: {
            [PROJECT_CHANGE_FILE.PROJECT_CHANGE_ID]: model.get('id'),
          },
        }),
    });
    if (projectChangeFileIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
