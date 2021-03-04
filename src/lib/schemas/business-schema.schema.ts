import * as Joi from 'joi';

// #region Graphql
export const businessSchemaMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  businessRuleId: Joi.string().allow('').description('角色'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  propertyJson: Joi.string().allow('').description('属性json'),
  remark: Joi.string().allow('').description('备注'),
  roleId: Joi.string().allow('').description('角色'),
  schemaModelId: Joi.string().allow('').description('对象属性id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
  valueDefault: Joi.string().allow('').description('默认值json'),
});

export const businessSchemaMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  businessRuleId: Joi.string().allow('').description('角色'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  propertyJson: Joi.string().allow('').description('属性json'),
  remark: Joi.string().allow('').description('备注'),
  roleId: Joi.string().allow('').description('角色'),
  schemaModelId: Joi.string().allow('').description('对象属性id'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
  valueDefault: Joi.string().allow('').description('默认值json'),
});

export const businessSchemaBulkMutation = Joi.array().items(businessSchemaMutationCreate);
// #endregion
