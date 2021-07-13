import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { SCHEMA_ORM, SchemaOrmModel } from '../models/schema-orm.model';
import { WORK_FLOW_NODE_FORM, WorkFlowNodeFormModel } from '../models/work-flow-node-form.model';
import { WORK_FLOW_ORM, WorkFlowOrmModel } from '../models/work-flow-orm.model';
import * as Bb from 'bluebird';
import { FormCustomSchemaModel } from '../models/form-custom-schema.model';

@provide('FormCustomSchemaHook')
export class FormCustomSchemaHook {

  async beforeDestroy(
    model: FormCustomSchemaModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { schemaOrmIbfk2, workFlowNodeFormIbfk2, workFlowOrmFormCustomSchemaIdForeignIdx } = await Bb.props({
        schemaOrmIbfk2: SchemaOrmModel.findOne({
          where: {
            [SCHEMA_ORM.FORM_CUSTOM_SCHEMA_ID]: model.get('id'),
          },
        }),
        workFlowNodeFormIbfk2: WorkFlowNodeFormModel.findOne({
          where: {
            [WORK_FLOW_NODE_FORM.FORM_CUSTOM_SCHEMA_ID]: model.get('id'),
          },
        }),
        workFlowOrmFormCustomSchemaIdForeignIdx: WorkFlowOrmModel.findOne({
          where: {
            [WORK_FLOW_ORM.FORM_CUSTOM_SCHEMA_ID]: model.get('id'),
          },
        }),
    });
    if (schemaOrmIbfk2 || workFlowNodeFormIbfk2 || workFlowOrmFormCustomSchemaIdForeignIdx) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
