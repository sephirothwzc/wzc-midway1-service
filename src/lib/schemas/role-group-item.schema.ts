import * as Joi from 'joi';

// #region Graphql
export const roleGroupItemMutationCreate = Joi.object().keys({
  appId: Joi.string().allow('').allow(null).description('app_client'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleGroupId: Joi.string().allow('').allow(null).description('角色组id'),
  roleId: Joi.string().allow('').allow(null).description('角色id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  weight: Joi.number().integer().description('权重'),
});

export const roleGroupItemMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appId: Joi.string().allow('').allow(null).description('app_client'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleGroupId: Joi.string().allow('').allow(null).description('角色组id'),
  roleId: Joi.string().allow('').allow(null).description('角色id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  weight: Joi.number().integer().description('权重'),
});

export const roleGroupItemBulkMutation = Joi.array().items(roleGroupItemMutationCreate);
// #endregion
