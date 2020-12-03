/**
 * 登陆用户
 */
export interface IAuth {
  id: string;
  type: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 过期时间
   */
  exp: number; // 60 s
  /**
   * token
   */
  token?: string;
}

export interface ICode2sessionOut {
  openid: string; // 用户唯一标识
  session_key: string; // 会话密钥
  unionid: string; // 用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回，详见 UnionID 机制说明。
  errcode: number; // 错误码
  errmsg: string; //错误信息
}

export interface IGetphonenumber {
  phoneNumber: String; // 用户绑定的手机号（国外手机号会有区号）
  purePhoneNumber: String; // 没有区号的手机号
  countryCode: String; // 区号
}
