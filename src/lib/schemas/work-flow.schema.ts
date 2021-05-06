import * as Joi from 'joi';

// #region Graphql
export const workFlowMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('编码'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  formCustomId: Joi.string().allow('').allow(null).description('表单id'),
  graph: Joi.object().allow(null).description('图形数据'),
  name: Joi.string().allow('').allow(null).description('名称'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  version: Joi.number().integer().description('版本'),
});

export const workFlowMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('编码'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  formCustomId: Joi.string().allow('').allow(null).description('表单id'),
  graph: Joi.object().allow(null).description('图形数据'),
  name: Joi.string().allow('').allow(null).description('名称'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  version: Joi.number().integer().description('版本'),
});

export const workFlowBulkMutation = Joi.array().items(workFlowMutationCreate);
// #endregion
