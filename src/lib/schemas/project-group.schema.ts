import * as Joi from 'joi';

// #region Graphql
export const projectGroupMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  endDate: Joi.date().allow(null).description('项目终止时间'),
  investmentAmount: Joi.number().integer().description('投资金额'),
  investmentYear: Joi.number().integer().description('投资年度'),
  name: Joi.string().allow('').allow(null).description('项目组名称'),
  projectGroupCode: Joi.string().allow('').allow(null).description('项目组编号[unique]'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  startDate: Joi.date().allow(null).description('项目起始时间'),
  synopsis: Joi.string().allow('').allow(null).description('项目组简介'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const projectGroupMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  endDate: Joi.date().allow(null).description('项目终止时间'),
  investmentAmount: Joi.number().integer().description('投资金额'),
  investmentYear: Joi.number().integer().description('投资年度'),
  name: Joi.string().allow('').allow(null).description('项目组名称'),
  projectGroupCode: Joi.string().allow('').allow(null).description('项目组编号[unique]'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  startDate: Joi.date().allow(null).description('项目起始时间'),
  synopsis: Joi.string().allow('').allow(null).description('项目组简介'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const projectGroupBulkMutation = Joi.array().items(projectGroupMutationCreate);
// #endregion
