import * as Joi from 'joi';

// #region Graphql
export const budgetAllocationMutationCreate = Joi.object().keys({
  amount: Joi.number().integer().description('预算金额'),
  budgetAid: Joi.string().allow('').allow(null).description('预算aid'),
  budgetBid: Joi.string().allow('').allow(null).description('预算bid'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectAid: Joi.string().allow('').allow(null).description('项目aid'),
  projectBid: Joi.string().allow('').allow(null).description('项目bid'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const budgetAllocationMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  amount: Joi.number().integer().description('预算金额'),
  budgetAid: Joi.string().allow('').allow(null).description('预算aid'),
  budgetBid: Joi.string().allow('').allow(null).description('预算bid'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectAid: Joi.string().allow('').allow(null).description('项目aid'),
  projectBid: Joi.string().allow('').allow(null).description('项目bid'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const budgetAllocationBulkMutation = Joi.array().items(budgetAllocationMutationCreate);
// #endregion
