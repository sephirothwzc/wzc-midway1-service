import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { FORM_CUSTOM_SCHEMA, FormCustomSchemaModel } from '../models/form-custom-schema.model';
import { SCHEMA_ORM, SchemaOrmModel } from '../models/schema-orm.model';
import { WORK_FLOW, WorkFlowModel } from '../models/work-flow.model';
import * as Bb from 'bluebird';
import { FormCustomModel } from '../models/form-custom.model';

@provide('FormCustomHook')
export class FormCustomHook {

  async beforeDestroy(
    model: FormCustomModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { formCustomSchemaIbfk1, schemaOrmIbfk1, workFlowFormCustomIdForeignIdx } = await Bb.props({
        formCustomSchemaIbfk1: FormCustomSchemaModel.findOne({
          where: {
            [FORM_CUSTOM_SCHEMA.FORM_CUSTOM_ID]: model.get('id'),
          },
        }),
        schemaOrmIbfk1: SchemaOrmModel.findOne({
          where: {
            [SCHEMA_ORM.FORM_CUSTOM_ID]: model.get('id'),
          },
        }),
        workFlowFormCustomIdForeignIdx: WorkFlowModel.findOne({
          where: {
            [WORK_FLOW.FORM_CUSTOM_ID]: model.get('id'),
          },
        }),
    });
    if (formCustomSchemaIbfk1 || schemaOrmIbfk1 || workFlowFormCustomIdForeignIdx) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
