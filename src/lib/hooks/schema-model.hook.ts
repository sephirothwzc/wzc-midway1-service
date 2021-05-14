import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { BUSINESS_SCHEMA, BusinessSchemaModel } from '../models/business-schema.model';
import { SCHEMA_MODEL, SchemaModelModel } from '../models/schema-model.model';
import { SCHEMA_MODEL_ROLE, SchemaModelRoleModel } from '../models/schema-model-role.model';
import * as Bb from 'bluebird';

@provide('SchemaModelHook')
export class SchemaModelHook {

  async beforeDestroy(
    model: SchemaModelModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { businessSchemaIbfk3, schemaModelIbfk1, schemaModelRoleIbfk2 } = await Bb.props({
        businessSchemaIbfk3: BusinessSchemaModel.findOne({
          where: {
            [BUSINESS_SCHEMA.SCHEMA_MODEL_ID]: model.get('id'),
          },
        }),
        schemaModelIbfk1: SchemaModelModel.findOne({
          where: {
            [SCHEMA_MODEL.PARENT_ID]: model.get('id'),
          },
        }),
        schemaModelRoleIbfk2: SchemaModelRoleModel.findOne({
          where: {
            [SCHEMA_MODEL_ROLE.SCHEMA_MODEL_ID]: model.get('id'),
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

    if (changed.includes(SCHEMA_MODEL.CODE) && model.get('code')) {
      const item0 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.CODE]: model.get('code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('编码已存在');
      }
    }
    

    if (changed.includes(SCHEMA_MODEL.NAME) && model.get('name')) {
      const item1 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.NAME]: model.get('name'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('名称已存在');
      }
    }
    
  }

  async beforeCreate(
    model: SchemaModelModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('code')) {
      const item0 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.CODE]: model.get('code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('编码已存在');
      }
    }
    

    if (model.get('name')) {
      const item1 = await SchemaModelModel.findOne({
        where: {
          [SCHEMA_MODEL.NAME]: model.get('name'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('名称已存在');
      }
    }
    
  }
  
}
