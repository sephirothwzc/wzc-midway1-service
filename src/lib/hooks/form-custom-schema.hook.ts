import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { SCHEMA_ORM, SchemaOrmModel } from '../models/schema-orm.model';
import * as Bb from 'bluebird';
import {
  FormCustomSchemaModel,
  FORM_CUSTOM_SCHEMA,
} from '../models/form-custom-schema.model';
import { toNumber } from 'lodash';

@provide('FormCustomSchemaHook')
export class FormCustomSchemaHook {
  async beforeDestroy(
    model: FormCustomSchemaModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { schemaOrmIbfk2 } = await Bb.props({
      schemaOrmIbfk2: SchemaOrmModel.findOne({
        where: {
          [SCHEMA_ORM.FORM_CUSTOM_SCHEMA_ID]: model.get('id'),
        },
      }),
    });
    if (schemaOrmIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }

  async beforeCreate(
    model: FormCustomSchemaModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    !model.version && model.set('version', 1);
    if (!model.get('formCustomId')) {
      throw new Error('formCustomId must require');
    }
    const item0 = await FormCustomSchemaModel.findOne({
      where: {
        [FORM_CUSTOM_SCHEMA.FORM_CUSTOM_ID]: model.get('formCustomId'),
      },
      order: [['version', 'DESC']],
      transaction: options?.transaction,
    });
    item0 && model.set('version', toNumber(item0.get('version')) + 1);
    return model;
  }
}
