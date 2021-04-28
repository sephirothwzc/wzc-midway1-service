import * as Joi from 'joi';

// #region Graphql
export const projectBudgetMutationCreate = Joi.object().keys({
  budgetId: Joi.string().allow('').allow(null).description('预算id'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectId: Joi.string().allow('').allow(null).description('项目id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const projectBudgetMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  budgetId: Joi.string().allow('').allow(null).description('预算id'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectId: Joi.string().allow('').allow(null).description('项目id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const projectBudgetBulkMutation = Joi.array().items(projectBudgetMutationCreate);
// #endregion
