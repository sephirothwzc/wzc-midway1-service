import * as Joi from 'joi';

// #region Graphql
export const appUserRoleMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  appUserId: Joi.string().allow('').allow(null).description('用户'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleType: Joi.string().allow('').allow(null).description('role、roleGroup'),
  typeId: Joi.string().allow('').allow(null).description('角色id、角色组id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const appUserRoleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  appUserId: Joi.string().allow('').allow(null).description('用户'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleType: Joi.string().allow('').allow(null).description('role、roleGroup'),
  typeId: Joi.string().allow('').allow(null).description('角色id、角色组id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const appUserRoleBulkMutation = Joi.array().items(appUserRoleMutationCreate);
// #endregion
