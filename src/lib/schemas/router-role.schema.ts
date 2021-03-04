import * as Joi from 'joi';

// #region Graphql
export const routerRoleMutationCreate = Joi.object().keys({
  authState: Joi.string().allow('').description('权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleId: Joi.string().allow('').description('角色'),
  routerId: Joi.string().allow('').description('路由id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const routerRoleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  authState: Joi.string().allow('').description('权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleId: Joi.string().allow('').description('角色'),
  routerId: Joi.string().allow('').description('路由id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const routerRoleBulkMutation = Joi.array().items(routerRoleMutationCreate);
// #endregion
