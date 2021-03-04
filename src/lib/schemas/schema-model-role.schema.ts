import * as Joi from 'joi';

// #region Graphql
export const schemaModelRoleMutationCreate = Joi.object().keys({
  authState: Joi.string().allow('').description('权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  businessValue: Joi.string().allow('').description('业务权限规则编码'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  dataState: Joi.string().allow('').description('权限[onlyOne onlyOne 只看自己，all all 可见可操作，businessCode businessCode 权限编码]'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleId: Joi.string().allow('').description('角色'),
  schemaModelId: Joi.string().allow('').description('对象id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const schemaModelRoleMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  authState: Joi.string().allow('').description('权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  businessValue: Joi.string().allow('').description('业务权限规则编码'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  dataState: Joi.string().allow('').description('权限[onlyOne onlyOne 只看自己，all all 可见可操作，businessCode businessCode 权限编码]'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  remark: Joi.string().allow('').description('备注'),
  roleId: Joi.string().allow('').description('角色'),
  schemaModelId: Joi.string().allow('').description('对象id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const schemaModelRoleBulkMutation = Joi.array().items(schemaModelRoleMutationCreate);
// #endregion
