import * as Joi from 'joi';

// #region Graphql
export const budgetMutationCreate = Joi.object().keys({
  budgetCode: Joi.string().allow('').allow(null).description('预算编号[unique]'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  department: Joi.string().allow('').allow(null).description('科室id'),
  expenditureMoney: Joi.number().integer().description('支出金额'),
  incomeMoney: Joi.number().integer().description('收入金额'),
  principle: Joi.string().allow('').allow(null).description('预算原则'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('预算状态'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const budgetMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  budgetCode: Joi.string().allow('').allow(null).description('预算编号[unique]'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  department: Joi.string().allow('').allow(null).description('科室id'),
  expenditureMoney: Joi.number().integer().description('支出金额'),
  incomeMoney: Joi.number().integer().description('收入金额'),
  principle: Joi.string().allow('').allow(null).description('预算原则'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('预算状态'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const budgetBulkMutation = Joi.array().items(budgetMutationCreate);
// #endregion
