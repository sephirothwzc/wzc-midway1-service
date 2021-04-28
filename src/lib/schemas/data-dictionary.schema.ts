import * as Joi from 'joi';

// #region Graphql
export const dataDictionaryMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  description: Joi.string().allow('').allow(null).description('说明文本'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示值'),
  key: Joi.string().allow('').allow(null).description('英文数字组成禁止标点符号'),
  parentId: Joi.string().allow('').allow(null).description('父级地址id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('Y启用N停用'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  value: Joi.string().allow('').allow(null).description('字典值'),
});

export const dataDictionaryMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  description: Joi.string().allow('').allow(null).description('说明文本'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示值'),
  key: Joi.string().allow('').allow(null).description('英文数字组成禁止标点符号'),
  parentId: Joi.string().allow('').allow(null).description('父级地址id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('Y启用N停用'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  value: Joi.string().allow('').allow(null).description('字典值'),
});

export const dataDictionaryBulkMutation = Joi.array().items(dataDictionaryMutationCreate);
// #endregion
