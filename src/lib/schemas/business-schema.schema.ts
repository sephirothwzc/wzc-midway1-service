import * as Joi from 'joi';

// #region Graphql
export const businessSchemaMutationCreate = Joi.object().keys({
  appId: Joi.string().allow('').allow(null).description('app_client'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  businessRuleId: Joi.string().allow('').allow(null).description('角色'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  propertyJson: Joi.object().allow(null).description('属性json'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleId: Joi.string().allow('').allow(null).description('角色'),
  schemaModelId: Joi.string().allow('').allow(null).description('对象属性id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  valueDefault: Joi.object().allow(null).description('默认值json'),
});

export const businessSchemaMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appId: Joi.string().allow('').allow(null).description('app_client'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  businessRuleId: Joi.string().allow('').allow(null).description('角色'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  propertyJson: Joi.object().allow(null).description('属性json'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  roleId: Joi.string().allow('').allow(null).description('角色'),
  schemaModelId: Joi.string().allow('').allow(null).description('对象属性id'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  valueDefault: Joi.object().allow(null).description('默认值json'),
});

export const businessSchemaBulkMutation = Joi.array().items(businessSchemaMutationCreate);
// #endregion
