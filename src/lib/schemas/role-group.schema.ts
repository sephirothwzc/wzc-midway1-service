import * as Joi from 'joi';

// #region Graphql
export const roleGroupMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  groupCode: Joi.string().allow('').allow(null).description('组编号[unique]'),
  groupName: Joi.string().allow('').allow(null).description('组名[unique]'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const roleGroupMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  groupCode: Joi.string().allow('').allow(null).description('组编号[unique]'),
  groupName: Joi.string().allow('').allow(null).description('组名[unique]'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const roleGroupBulkMutation = Joi.array().items(roleGroupMutationCreate);
// #endregion
