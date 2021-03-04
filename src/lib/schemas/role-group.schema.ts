import * as Joi from 'joi';

// #region Graphql
export const roleGroupMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  groupCode: Joi.string().allow('').description('组编号[unique]'),
  groupName: Joi.string().allow('').description('组名[unique]'),
  remark: Joi.string().allow('').description('备注'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const roleGroupMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  groupCode: Joi.string().allow('').description('组编号[unique]'),
  groupName: Joi.string().allow('').description('组名[unique]'),
  remark: Joi.string().allow('').description('备注'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const roleGroupBulkMutation = Joi.array().items(roleGroupMutationCreate);
// #endregion
