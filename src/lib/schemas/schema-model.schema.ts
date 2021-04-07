import * as Joi from 'joi';

// #region Graphql
export const schemaModelMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('编码[unique]'),
  comment: Joi.string().allow('').allow(null).description('备注'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  indexJson: Joi.object().allow(null).description('索引json'),
  name: Joi.string().allow('').allow(null).description('名称[unique]'),
  parentId: Joi.string().allow('').allow(null).description('父级别'),
  propertyJson: Joi.object().allow(null).description('属性json'),
  propertyType: Joi.string().allow('').allow(null).description('属性类型'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  schemaType: Joi.string().allow('').allow(null).description('[model model 对象,property property 属性]'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const schemaModelMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('编码[unique]'),
  comment: Joi.string().allow('').allow(null).description('备注'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  indexJson: Joi.object().allow(null).description('索引json'),
  name: Joi.string().allow('').allow(null).description('名称[unique]'),
  parentId: Joi.string().allow('').allow(null).description('父级别'),
  propertyJson: Joi.object().allow(null).description('属性json'),
  propertyType: Joi.string().allow('').allow(null).description('属性类型'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  schemaType: Joi.string().allow('').allow(null).description('[model model 对象,property property 属性]'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const schemaModelBulkMutation = Joi.array().items(schemaModelMutationCreate);
// #endregion
