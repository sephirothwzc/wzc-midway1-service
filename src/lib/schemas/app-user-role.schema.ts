import * as Joi from 'joi';

// #region Graphql
export const appUserRoleMutationCreate = Joi.object().keys({
  appUserId: Joi.string().allow('').description('用户'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleType: Joi.string().allow('').description('role、roleGroup'),
  typeId: Joi.string().allow('').description('角色id、角色组id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const appUserRoleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appUserId: Joi.string().allow('').description('用户'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleType: Joi.string().allow('').description('role、roleGroup'),
  typeId: Joi.string().allow('').description('角色id、角色组id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const appUserRoleBulkMutation = Joi.array().items(appUserRoleMutationCreate);
// #endregion
