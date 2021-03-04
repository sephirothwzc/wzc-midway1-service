import * as Joi from 'joi';

// #region Graphql
export const businessRuleMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  ruleCode: Joi.string().allow('').description('规则编码[unique]'),
  ruleName: Joi.string().allow('').description('规则名称[unique]'),
  ruleValue: Joi.string().allow('').description('规则'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const businessRuleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  ruleCode: Joi.string().allow('').description('规则编码[unique]'),
  ruleName: Joi.string().allow('').description('规则名称[unique]'),
  ruleValue: Joi.string().allow('').description('规则'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const businessRuleBulkMutation = Joi.array().items(businessRuleMutationCreate);
// #endregion
