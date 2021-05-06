import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { PROJECT, ProjectModel } from '../models/project.model';
import * as Bb from 'bluebird';

@provide('FormCustomSchemaHook')
export class FormCustomSchemaHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { projectSchemaIdForeignIdx } = await Bb.props({
        projectSchemaIdForeignIdx: ProjectModel.findOne({
          where: {
            [PROJECT.SCHEMA_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (projectSchemaIdForeignIdx) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
