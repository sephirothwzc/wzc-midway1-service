import * as Joi from 'joi';

// #region Graphql
export const roleMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleCode: Joi.string().allow('').allow(null).description('角色编码'),
  roleName: Joi.string().allow('').allow(null).description('角色名称'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  weight: Joi.number().integer().description('权重'),
});

export const roleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleCode: Joi.string().allow('').allow(null).description('角色编码'),
  roleName: Joi.string().allow('').allow(null).description('角色名称'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  weight: Joi.number().integer().description('权重'),
});

export const roleBulkMutation = Joi.array().items(roleMutationCreate);
// #endregion
