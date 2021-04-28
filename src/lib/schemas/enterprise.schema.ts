import * as Joi from 'joi';

// #region Graphql
export const enterpriseMutationCreate = Joi.object().keys({
  address: Joi.string().allow('').allow(null).description('企业注册地址'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  contacts: Joi.string().allow('').allow(null).description('联系人'),
  contactsPhone: Joi.string().allow('').allow(null).description('联系人电话'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  enterpriseStatus: Joi.string().allow('').allow(null).description('状态'),
  enterpriseTypeId: Joi.string().allow('').allow(null).description('企业类型'),
  name: Joi.string().allow('').allow(null).description('企业名称'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const enterpriseMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  address: Joi.string().allow('').allow(null).description('企业注册地址'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  contacts: Joi.string().allow('').allow(null).description('联系人'),
  contactsPhone: Joi.string().allow('').allow(null).description('联系人电话'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  enterpriseStatus: Joi.string().allow('').allow(null).description('状态'),
  enterpriseTypeId: Joi.string().allow('').allow(null).description('企业类型'),
  name: Joi.string().allow('').allow(null).description('企业名称'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const enterpriseBulkMutation = Joi.array().items(enterpriseMutationCreate);
// #endregion
