import * as Joi from 'joi';

// #region Graphql
export const businessRuleMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  ruleCode: Joi.string().allow('').allow(null).description('规则编码[unique]'),
  ruleName: Joi.string().allow('').allow(null).description('规则名称[unique]'),
  ruleValue: Joi.object().allow(null).description('规则'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const businessRuleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  ruleCode: Joi.string().allow('').allow(null).description('规则编码[unique]'),
  ruleName: Joi.string().allow('').allow(null).description('规则名称[unique]'),
  ruleValue: Joi.object().allow(null).description('规则'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const businessRuleBulkMutation = Joi.array().items(businessRuleMutationCreate);
// #endregion
