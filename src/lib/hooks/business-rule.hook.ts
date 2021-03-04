import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { BUSINESS_SCHEMA, BusinessSchemaModel } from '../models/business-schema.model';
import * as Bb from 'bluebird';
import { BUSINESS_RULE, BusinessRuleModel } from '../models/business-rule.model';

@provide('BusinessRuleHook')
export class BusinessRuleHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { businessSchemaIbfk2 } = await Bb.props({
        businessSchemaIbfk2: BusinessSchemaModel.findOne({
          where: {
            [BUSINESS_SCHEMA.BUSINESS_RULE_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (businessSchemaIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


  async beforeUpdate(
    model: BusinessRuleModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(BUSINESS_RULE.RULE_CODE) && model.get('RuleCode')) {
      const item0 = await BusinessRuleModel.findOne({
        where: {
          [BUSINESS_RULE.RULE_CODE]: model.get('RuleCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('规则编码已存在');
      }
    }
    

    if (changed.includes(BUSINESS_RULE.RULE_NAME) && model.get('RuleName')) {
      const item1 = await BusinessRuleModel.findOne({
        where: {
          [BUSINESS_RULE.RULE_NAME]: model.get('RuleName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('规则名称已存在');
      }
    }
    
  }

  async beforeCreate(
    model: BusinessRuleModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('RuleCode')) {
      const item0 = await BusinessRuleModel.findOne({
        where: {
          [BUSINESS_RULE.RULE_CODE]: model.get('RuleCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('规则编码已存在');
      }
    }
    

    if (model.get('RuleName')) {
      const item1 = await BusinessRuleModel.findOne({
        where: {
          [BUSINESS_RULE.RULE_NAME]: model.get('RuleName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('规则名称已存在');
      }
    }
    
  }
  
}
