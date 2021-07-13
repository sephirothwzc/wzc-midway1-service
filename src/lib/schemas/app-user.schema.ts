import * as Joi from 'joi';

// #region Graphql
export const appUserMutationCreate = Joi.object().keys({
  accessToken: Joi.string().allow('').allow(null).description('凭证'),
  appId: Joi.string().allow('').allow(null).description('app_client'),
  appUserStatus: Joi.string().allow('').allow(null).description('用户状态N停用Y启用'),
  appUserType: Joi.string().allow('').allow(null).description('用户类型[ordinary 普通用户,system 系统用户]'),
  avatarUrl: Joi.string().allow('').allow(null).description('wx头像'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  corpid: Joi.string().allow('').allow(null).description('wxmini-用户所属企业的corpid'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  defaultAvatar: Joi.string().allow('').allow(null).description('系统默认头像'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  idHead: Joi.string().allow('').allow(null).description('身份证头像'),
  idNational: Joi.string().allow('').allow(null).description('身份证国徽'),
  jsCode: Joi.string().allow('').allow(null).description('登陆code（最后一次）'),
  lastHeartbeatTime: Joi.date().allow(null).description('用户最后心跳时间'),
  lastLoginTime: Joi.date().allow(null).description('最后登陆时间'),
  nickName: Joi.string().allow('').allow(null).description('用户昵称'),
  openid: Joi.string().allow('').allow(null).description('wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid'),
  password: Joi.string().allow('').allow(null).description('密码（小程序不需要）'),
  phone: Joi.string().allow('').allow(null).description('注册手机号'),
  realName: Joi.string().allow('').allow(null).description('用户真实姓名'),
  registerApp: Joi.string().allow('').allow(null).description('注册app'),
  registerTime: Joi.date().allow(null).description('注册时间'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  token: Joi.string().allow('').allow(null).description('用户最后颁发token'),
  unionid: Joi.string().allow('').allow(null).description('wxmini-用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  userGender: Joi.string().allow('').allow(null).description('用户性别 男 m 男，女 w 女'),
  userName: Joi.string().allow('').allow(null).description('用户名登陆用'),
});

export const appUserMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  accessToken: Joi.string().allow('').allow(null).description('凭证'),
  appId: Joi.string().allow('').allow(null).description('app_client'),
  appUserStatus: Joi.string().allow('').allow(null).description('用户状态N停用Y启用'),
  appUserType: Joi.string().allow('').allow(null).description('用户类型[ordinary 普通用户,system 系统用户]'),
  avatarUrl: Joi.string().allow('').allow(null).description('wx头像'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  corpid: Joi.string().allow('').allow(null).description('wxmini-用户所属企业的corpid'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  defaultAvatar: Joi.string().allow('').allow(null).description('系统默认头像'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  idHead: Joi.string().allow('').allow(null).description('身份证头像'),
  idNational: Joi.string().allow('').allow(null).description('身份证国徽'),
  jsCode: Joi.string().allow('').allow(null).description('登陆code（最后一次）'),
  lastHeartbeatTime: Joi.date().allow(null).description('用户最后心跳时间'),
  lastLoginTime: Joi.date().allow(null).description('最后登陆时间'),
  nickName: Joi.string().allow('').allow(null).description('用户昵称'),
  openid: Joi.string().allow('').allow(null).description('wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid'),
  password: Joi.string().allow('').allow(null).description('密码（小程序不需要）'),
  phone: Joi.string().allow('').allow(null).description('注册手机号'),
  realName: Joi.string().allow('').allow(null).description('用户真实姓名'),
  registerApp: Joi.string().allow('').allow(null).description('注册app'),
  registerTime: Joi.date().allow(null).description('注册时间'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  token: Joi.string().allow('').allow(null).description('用户最后颁发token'),
  unionid: Joi.string().allow('').allow(null).description('wxmini-用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  userGender: Joi.string().allow('').allow(null).description('用户性别 男 m 男，女 w 女'),
  userName: Joi.string().allow('').allow(null).description('用户名登陆用'),
});

export const appUserBulkMutation = Joi.array().items(appUserMutationCreate);
// #endregion
