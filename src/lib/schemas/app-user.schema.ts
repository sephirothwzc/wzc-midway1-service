import * as Joi from 'joi';

// #region restful
export const appUserLoginIn = Joi.object().keys({
  userName: Joi.string().required().min(3).max(50).description('用户名'),
  password: Joi.string().required().min(5).max(50).description('密码'),
});
// #endregion
// #region Graphql
export const appUserMutationCreate = Joi.object().keys({
  accessToken: Joi.string().allow('').description('凭证'),
  appUserStatus: Joi.string().allow('').description('用户状态N停用Y启用'),
  appUserType: Joi.string()
    .allow('')
    .valid('ordinary', 'recovery', 'system')
    .description(
      '用户类型[ordinary 普通用户,recovery 回收人员,system 系统用户]'
    ),
  avatarUrl: Joi.string().allow('').description('wx头像'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  corpid: Joi.string().allow('').description('wxmini-用户所属企业的corpid'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  defaultAvatar: Joi.string().allow('').description('系统默认头像'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  idHead: Joi.string().allow('').description('身份证头像'),
  idNational: Joi.string().allow('').description('身份证国徽'),
  jsCode: Joi.string().allow('').description('登陆code（最后一次）'),
  lastHeartbeatTime: Joi.date().description('用户最后心跳时间'),
  lastLoginTime: Joi.date().description('最后登陆时间'),
  nickName: Joi.string().allow('').description('用户昵称'),
  openid: Joi.string()
    .allow('')
    .description(
      'wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid'
    ),
  password: Joi.string().allow('').description('密码（小程序不需要）'),
  phone: Joi.string().allow('').description('注册手机号'),
  realName: Joi.string().allow('').description('用户真实姓名'),
  registerTime: Joi.date().description('注册时间'),
  remark: Joi.string().allow('').description('备注'),
  token: Joi.string().allow('').description('用户最后颁发token'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
  userGender: Joi.string()
    .allow('')
    .valid('m', 'w')
    .description('用户性别[男 m 男，女 w 女]'),
  userName: Joi.string().allow('').description('用户名登陆用'),
});

export const appUserMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  accessToken: Joi.string().allow('').description('凭证'),
  appUserStatus: Joi.string().allow('').description('用户状态N停用Y启用'),
  appUserType: Joi.string()
    .allow('')
    .valid('ordinary', 'recovery', 'system')
    .description(
      '用户类型[ordinary 普通用户,recovery 回收人员,system 系统用户]'
    ),
  avatarUrl: Joi.string().allow('').description('wx头像'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  corpid: Joi.string().allow('').description('wxmini-用户所属企业的corpid'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  defaultAvatar: Joi.string().allow('').description('系统默认头像'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  idHead: Joi.string().allow('').description('身份证头像'),
  idNational: Joi.string().allow('').description('身份证国徽'),
  jsCode: Joi.string().allow('').description('登陆code（最后一次）'),
  lastHeartbeatTime: Joi.date().description('用户最后心跳时间'),
  lastLoginTime: Joi.date().description('最后登陆时间'),
  nickName: Joi.string().allow('').description('用户昵称'),
  openid: Joi.string()
    .allow('')
    .description(
      'wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid'
    ),
  password: Joi.string().allow('').description('密码（小程序不需要）'),
  phone: Joi.string().allow('').description('注册手机号'),
  realName: Joi.string().allow('').description('用户真实姓名'),
  registerTime: Joi.date().description('注册时间'),
  remark: Joi.string().allow('').description('备注'),
  token: Joi.string().allow('').description('用户最后颁发token'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
  userGender: Joi.string()
    .allow('')
    .valid('m', 'w')
    .description('用户性别[男 m 男，女 w 女]'),
  userName: Joi.string().allow('').description('用户名登陆用'),
});

export const appUserBulkMutation = Joi.array().items(appUserMutationCreate);
// #endregion
