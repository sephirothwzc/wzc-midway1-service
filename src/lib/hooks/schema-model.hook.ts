import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  BUSINESS_SCHEMA,
  BusinessSchemaModel,
} from '../models/business-schema.model';
import { SCHEMA_MODEL, SchemaModelModel } from '../models/schema-model.model';
import {
  SCHEMA_MODEL_ROLE,
  SchemaModelRoleModel,
} from '../models/schema-model-role.model';
import * as Bb from 'bluebird';

@provide('SchemaModelHook')
export class SchemaModelHook {
  async beforeBulkDestroy(model: {
    where: { id: string };
    transaction: Transaction;
  }) {
    const {
      businessSchemaIbfk3,
      schemaModelIbfk1,
      schemaModelRoleIbfk2,
    } = await Bb.props({
      businessSchemaIbfk3: BusinessSchemaModel.findOne({
        where: {
          [BUSINESS_SCHEMA.SCHEMA_MODEL_ID]: _.get(model, 'where.id'),
        },
      }),
      schemaModelIbfk1: SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.PARENT_ID]: _.get(model, 'where.id'),
        },
      }),
      schemaModelRoleIbfk2: SchemaModelRoleModel.findOne({
        where: {
          [SCHEMA_MODEL_ROLE.SCHEMA_MODEL_ID]: _.get(model, 'where.id'),
        },
      }),
    });
    if (businessSchemaIbfk3 || schemaModelIbfk1 || schemaModelRoleIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }

  async beforeUpdate(
    model: SchemaModelModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(SCHEMA_MODEL.CODE) && model.get('Code')) {
      const item0 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.CODE]: model.get('Code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('编码[unique]已存在');
      }
    }

    if (changed.includes(SCHEMA_MODEL.NAME) && model.get('Name')) {
      const item1 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.NAME]: model.get('Name'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('名称[unique]已存在');
      }
    }
  }

  async beforeCreate(
    model: SchemaModelModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (model.get('Code')) {
      const item0 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.CODE]: model.get('Code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('编码[unique]已存在');
      }
    }

    if (model.get('Name')) {
      const item1 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.NAME]: model.get('Name'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('名称[unique]已存在');
      }
    }
  }
}
