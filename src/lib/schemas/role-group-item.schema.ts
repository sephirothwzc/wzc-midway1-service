import * as Joi from 'joi';

// #region Graphql
export const roleGroupItemMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleGroupId: Joi.string().allow('').description('角色组id'),
  roleId: Joi.string().allow('').description('角色id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
  weight: Joi.number().integer().description('权重'),
});

export const roleGroupItemMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleGroupId: Joi.string().allow('').description('角色组id'),
  roleId: Joi.string().allow('').description('角色id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
  weight: Joi.number().integer().description('权重'),
});

export const roleGroupItemBulkMutation = Joi.array().items(roleGroupItemMutationCreate);
// #endregion
