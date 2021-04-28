import * as Joi from 'joi';

// #region Graphql
export const capitalAccountMutationCreate = Joi.object().keys({
  bankAccount: Joi.string().allow('').allow(null).description('开户银行账号'),
  bankDeposit: Joi.string().allow('').allow(null).description('开户银行'),
  bankNumber: Joi.string().allow('').allow(null).description('开户银行行号'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('账户编号'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  enterpriseId: Joi.string().allow('').allow(null).description('企业信息id'),
  hasEnterprise: Joi.string().allow('').allow(null).description('是否企业'),
  name: Joi.string().allow('').allow(null).description('账户名称'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('状态'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const capitalAccountMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  bankAccount: Joi.string().allow('').allow(null).description('开户银行账号'),
  bankDeposit: Joi.string().allow('').allow(null).description('开户银行'),
  bankNumber: Joi.string().allow('').allow(null).description('开户银行行号'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('账户编号'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  enterpriseId: Joi.string().allow('').allow(null).description('企业信息id'),
  hasEnterprise: Joi.string().allow('').allow(null).description('是否企业'),
  name: Joi.string().allow('').allow(null).description('账户名称'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('状态'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const capitalAccountBulkMutation = Joi.array().items(capitalAccountMutationCreate);
// #endregion
