import * as Joi from 'joi';

// #region Graphql
export const formCustomSchemaMutationCreate = Joi.object().keys({
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  finishFun: Joi.string().allow('').allow(null).description('finish自定义函数'),
  finishGraphql: Joi.string().allow('').allow(null).description('提交graphql'),
  formCustomId: Joi.string().allow('').allow(null).description('主流程id'),
  initFun: Joi.string().allow('').allow(null).description('加载自定义函数'),
  initGraphql: Joi.string().allow('').allow(null).description('加载graphql'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  reqFun: Joi.string().allow('').allow(null).description('自定义函数对象集合'),
  type: Joi.string().allow('').allow(null).description('类型form、list'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  urlGraphql: Joi.string().allow('').allow(null).description('gql地址'),
  version: Joi.number().integer().description('版本'),
  xrender: Joi.object().allow(null).description('schema'),
  xrenderString: Joi.string()
    .allow('')
    .allow(null)
    .description('xrender格式化文本'),
});

export const formCustomSchemaMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  finishFun: Joi.string().allow('').allow(null).description('finish自定义函数'),
  finishGraphql: Joi.string().allow('').allow(null).description('提交graphql'),
  formCustomId: Joi.string().allow('').allow(null).description('主流程id'),
  initFun: Joi.string().allow('').allow(null).description('加载自定义函数'),
  initGraphql: Joi.string().allow('').allow(null).description('加载graphql'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  reqFun: Joi.string().allow('').allow(null).description('自定义函数对象集合'),
  type: Joi.string().allow('').allow(null).description('类型form、list'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  urlGraphql: Joi.string().allow('').allow(null).description('gql地址'),
  version: Joi.number().integer().description('版本'),
  xrender: Joi.object().allow(null).description('schema'),
  xrenderString: Joi.string()
    .allow('')
    .allow(null)
    .description('xrender格式化文本'),
});

export const formCustomSchemaBulkMutation = Joi.array().items(
  formCustomSchemaMutationCreate
);
// #endregion
