import * as Joi from 'joi';

// #region Graphql
export const appClientMutationCreate = Joi.object().keys({
  accessToken: Joi.string().allow('').allow(null).description('凭证'),
  appCode: Joi.string().allow('').allow(null).description('编码'),
  appName: Joi.string().allow('').allow(null).description('名称'),
  appStatus: Joi.string().allow('').allow(null).description('用户状态N停用Y启用'),
  appType: Joi.string().allow('').allow(null).description('类型'),
  avatarUrl: Joi.string().allow('').allow(null).description('wx头像'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  defaultAvatar: Joi.string().allow('').allow(null).description('系统默认头像'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  phone: Joi.string().allow('').allow(null).description('注册手机号'),
  registerTime: Joi.date().allow(null).description('注册时间'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const appClientMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  accessToken: Joi.string().allow('').allow(null).description('凭证'),
  appCode: Joi.string().allow('').allow(null).description('编码'),
  appName: Joi.string().allow('').allow(null).description('名称'),
  appStatus: Joi.string().allow('').allow(null).description('用户状态N停用Y启用'),
  appType: Joi.string().allow('').allow(null).description('类型'),
  avatarUrl: Joi.string().allow('').allow(null).description('wx头像'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  defaultAvatar: Joi.string().allow('').allow(null).description('系统默认头像'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  phone: Joi.string().allow('').allow(null).description('注册手机号'),
  registerTime: Joi.date().allow(null).description('注册时间'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const appClientBulkMutation = Joi.array().items(appClientMutationCreate);
// #endregion
