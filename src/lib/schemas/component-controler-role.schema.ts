import * as Joi from 'joi';

// #region Graphql
export const componentControlerRoleMutationCreate = Joi.object().keys({
  appId: Joi.string().allow('').allow(null).description('app_client'),
  authState: Joi.string().allow('').allow(null).description('权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  componentControlerId: Joi.string().allow('').allow(null).description('控件id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleId: Joi.string().allow('').allow(null).description('角色id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const componentControlerRoleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appId: Joi.string().allow('').allow(null).description('app_client'),
  authState: Joi.string().allow('').allow(null).description('权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  componentControlerId: Joi.string().allow('').allow(null).description('控件id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleId: Joi.string().allow('').allow(null).description('角色id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const componentControlerRoleBulkMutation = Joi.array().items(componentControlerRoleMutationCreate);
// #endregion
