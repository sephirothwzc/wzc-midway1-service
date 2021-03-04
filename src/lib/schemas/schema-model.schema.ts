import * as Joi from 'joi';

// #region Graphql
export const schemaModelMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  code: Joi.string().allow('').description('编码[unique]'),
  comment: Joi.string().allow('').description('备注'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  indexJson: Joi.string().allow('').description('索引json'),
  name: Joi.string().allow('').description('名称[unique]'),
  parentId: Joi.string().allow('').description('父级别'),
  propertyJson: Joi.string().allow('').description('属性json'),
  propertyType: Joi.string().allow('').description('属性类型'),
  remark: Joi.string().allow('').description('备注'),
  schemaType: Joi.string().allow('').description('[model model 对象,property property 属性]'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const schemaModelMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  code: Joi.string().allow('').description('编码[unique]'),
  comment: Joi.string().allow('').description('备注'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  indexJson: Joi.string().allow('').description('索引json'),
  name: Joi.string().allow('').description('名称[unique]'),
  parentId: Joi.string().allow('').description('父级别'),
  propertyJson: Joi.string().allow('').description('属性json'),
  propertyType: Joi.string().allow('').description('属性类型'),
  remark: Joi.string().allow('').description('备注'),
  schemaType: Joi.string().allow('').description('[model model 对象,property property 属性]'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const schemaModelBulkMutation = Joi.array().items(schemaModelMutationCreate);
// #endregion
