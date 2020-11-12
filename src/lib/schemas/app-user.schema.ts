import * as Joi from 'joi';
// #region restful
export const code2sessionGetIn = Joi.object().keys({
  jsCode: Joi.string().allow('').required().description('登录时获取的 code'),
});

export const code2sessionGetOut = Joi.object().keys({
  id: Joi.string().allow(''),
  phone: Joi.string().allow('').description('用户手机号'),
  token: Joi.string().allow('').description('token'),
  // userName: Joi.string().allow('').description('nickName'),
  appUserType: Joi.string().allow('').description('用户类型'),
  openid: Joi.string().allow('').description('用户唯一标识'),
  session_key: Joi.string().allow('').description('会话密钥'),
  unionid: Joi.string()
    .allow('')
    .description(
      '用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回'
    ),
  errcode: Joi.number().description('错误码'),
  errmsg: Joi.string().allow('').description('错误信息'),
});

export const registerPostIn = Joi.object().keys({
  id: Joi.string().allow(''),
  phone: Joi.string().allow('').description('用户手机号'),
  // userName: Joi.string().allow('').description('nickName'),
  openid: Joi.string().allow('').description('用户唯一标识'),
  unionid: Joi.string()
    .allow('')
    .description(
      '用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回'
    ),
  avatarUrl: Joi.string().allow('').description('wx头像'),
  corpid: Joi.string().allow('').description('wxmini-用户所属企业的corpid'),
  nickName: Joi.string().allow('').description('用户昵称'),
  userGender: Joi.string().allow('').valid('m', 'w').description('wx头像'),
});

export const registerPostOut = Joi.object().keys({
  id: Joi.string().allow(''),
  phone: Joi.string().allow('').description('用户手机号'),
  token: Joi.string().allow('').description('token'),
  userName: Joi.string().allow('').description('nickName'),
  openid: Joi.string().allow('').description('用户唯一标识'),
  unionid: Joi.string()
    .allow('')
    .description(
      '用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回'
    ),
  appUserType: Joi.string().allow('').description('用户类型'),
});

export const getphonenumberPostIn = Joi.object().keys({
  sessionKey: Joi.string().required().description('code 换取的 sessionKey'),
  encryptedData: Joi.string()
    .required()
    .description('包括敏感数据在内的完整用户信息的加密数据'),
  iv: Joi.string().required().description('加密算法的初始向量'),
  cloudID: Joi.string()
    .allow('')
    .description(
      '敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据 code'
    ),
});

export const bucketLaunchPostIn = Joi.object().keys({
  code: Joi.string()
    .required()
    .regex(/([^:]*){4}/)
    .description('值守码[key]:[id]:[code]:[fixedid]'),
});

export const miniQrcodeGetIn = Joi.object().keys({
  scene: Joi.string()
    .allow('')
    .required()
    .description(
      `最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）`
    ),
  page: Joi.string()
    .allow('')
    .description(
      '必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面'
    ),
  width: Joi.number()
    .integer()
    .min(280)
    .max(1280)
    .default(430)
    .description('二维码的宽度，单位 px，最小 280px，最大 1280px'),
  autoColor: Joi.boolean()
    .default(false)
    .description(
      '自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false'
    ),
  lineColor: Joi.object()
    .keys({
      r: Joi.string().required(),
      g: Joi.string().required(),
      b: Joi.string().required(),
    })
    .when('autoColor', {
      is: Joi.boolean().equal(true),
      then: Joi.required(),
    })
    .description(
      'auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示'
    ),
  isHyaline: Joi.boolean()
    .default(false)
    .description('是否需要透明底色，为 true 时，生成透明底色的小程序'),
});

export const loginPostIn = Joi.object().keys({
  userName: Joi.string().required().description('用户名'),
  password: Joi.string().required().description('密码'),
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
  registerApp: Joi.string().allow('').description('注册app'),
  registerTime: Joi.date().description('注册时间'),
  remark: Joi.string().allow('').description('备注'),
  token: Joi.string().allow('').description('用户最后颁发token'),
  unionid: Joi.string()
    .allow('')
    .description(
      'wxmini-用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回'
    ),
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
  registerApp: Joi.string().allow('').description('注册app'),
  registerTime: Joi.date().description('注册时间'),
  remark: Joi.string().allow('').description('备注'),
  token: Joi.string().allow('').description('用户最后颁发token'),
  unionid: Joi.string()
    .allow('')
    .description(
      'wxmini-用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回'
    ),
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
