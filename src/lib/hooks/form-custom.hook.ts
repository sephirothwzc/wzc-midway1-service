import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { FORM_CUSTOM_SCHEMA, FormCustomSchemaModel } from '../models/form-custom-schema.model';
import { SCHEMA_ORM, SchemaOrmModel } from '../models/schema-orm.model';
import { WORK_FLOW, WorkFlowModel } from '../models/work-flow.model';
import * as Bb from 'bluebird';

@provide('FormCustomHook')
export class FormCustomHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { formCustomSchemaIbfk1, schemaOrmIbfk1, workFlowFormCustomIdForeignIdx } = await Bb.props({
        formCustomSchemaIbfk1: FormCustomSchemaModel.findOne({
          where: {
            [FORM_CUSTOM_SCHEMA.FORM_CUSTOM_ID]: _.get(model, 'where.id'),
          },
        }),
        schemaOrmIbfk1: SchemaOrmModel.findOne({
          where: {
            [SCHEMA_ORM.FORM_CUSTOM_ID]: _.get(model, 'where.id'),
          },
        }),
        workFlowFormCustomIdForeignIdx: WorkFlowModel.findOne({
          where: {
            [WORK_FLOW.FORM_CUSTOM_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (formCustomSchemaIbfk1 || schemaOrmIbfk1 || workFlowFormCustomIdForeignIdx) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
