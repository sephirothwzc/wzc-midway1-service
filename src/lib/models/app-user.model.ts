import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';

// #region enum
export enum EAppUserAppUserType {
  /**
   * 普通用户
   */
  ordinary = 'ordinary',
  /**
   * 回收人员
   */
  recovery = 'recovery',
  /**
   * 系统用户
   */
  system = 'system',
}

export enum EAppUserUserGender {
  /**
   * 男
   */
  男 = 'm',
  /**
   * 女
   */
  女 = 'w',
}

// #endregion

// 依赖注入 导出类型
/**
 * 终端用户
 */
export type IAppUserModel = typeof AppUserModel;

/**
 * 终端用户
 */
@Table({
  tableName: 'app_user',
  comment: '终端用户',
})
export class AppUserModel extends BaseModel {
  /**
   * 凭证
   */
  @Column({ comment: '凭证', type: DataType.STRING(100) })
  accessToken: string;
  /**
   * 用户状态N停用Y启用
   */
  @Column({ comment: '用户状态N停用Y启用', type: DataType.STRING(255) })
  appUserStatus: string;
  /**
   * 用户类型[ordinary 普通用户,recovery 回收人员,system 系统用户]
   */
  @Column({
    comment: '用户类型[ordinary 普通用户,recovery 回收人员,system 系统用户]',
    type: DataType.ENUM('ordinary', 'recovery', 'system'),
  })
  appUserType: EAppUserAppUserType;
  /**
   * wx头像
   */
  @Column({ comment: 'wx头像', type: DataType.STRING(500) })
  avatarUrl: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * wxmini-用户所属企业的corpid
   */
  @Column({
    comment: 'wxmini-用户所属企业的corpid',
    type: DataType.STRING(100),
  })
  corpid?: string;
  /**
   * 系统默认头像
   */
  @Column({ comment: '系统默认头像', type: DataType.STRING(500) })
  defaultAvatar: string;
  /**
   * 身份证头像
   */
  @Column({ comment: '身份证头像', type: DataType.STRING(500) })
  idHead: string;
  /**
   * 身份证国徽
   */
  @Column({ comment: '身份证国徽', type: DataType.STRING(500) })
  idNational: string;
  /**
   * 登陆code（最后一次）
   */
  @Column({ comment: '登陆code（最后一次）', type: DataType.STRING(50) })
  jsCode: string;
  /**
   * 用户最后心跳时间
   */
  @Column({ comment: '用户最后心跳时间', type: DataType.DATE })
  lastHeartbeatTime?: Date;
  /**
   * 最后登陆时间
   */
  @Column({ comment: '最后登陆时间', type: DataType.DATE })
  lastLoginTime?: Date;
  /**
   * 用户昵称
   */
  @Column({ comment: '用户昵称', type: DataType.STRING(15) })
  nickName: string;
  /**
   * wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid
   */
  @Column({
    comment:
      'wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid',
    type: DataType.STRING(100),
  })
  openid?: string;
  /**
   * 密码（小程序不需要）
   */
  @Column({ comment: '密码（小程序不需要）', type: DataType.STRING(100) })
  password: string;
  /**
   * 注册手机号
   */
  @Column({ comment: '注册手机号', type: DataType.STRING(15) })
  phone: string;
  /**
   * 注册时间
   */
  @Column({ comment: '注册时间', type: DataType.DATE })
  registerTime: Date;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 用户最后颁发token
   */
  @Column({ comment: '用户最后颁发token', type: DataType.STRING(200) })
  token?: string;
  /**
   * 用户性别[男 m 男，女 w 女]
   */
  @Column({
    comment: '用户性别[男 m 男，女 w 女]',
    type: DataType.ENUM('m', 'w'),
  })
  userGender: EAppUserUserGender;
  /**
   * 用户真实姓名
   */
  @Column({ comment: '用户真实姓名', type: DataType.STRING(15) })
  userName: string;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class APP_USER {
  /**
   * 凭证
   */
  static readonly ACCESS_TOKEN: string = 'accessToken';

  /**
   * 用户状态N停用Y启用
   */
  static readonly APP_USER_STATUS: string = 'appUserStatus';

  /**
   * 用户类型[ordinary 普通用户,recovery 回收人员,system 系统用户]
   */
  static readonly APP_USER_TYPE: string = 'appUserType';

  /**
   * wx头像
   */
  static readonly AVATAR_URL: string = 'avatarUrl';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * wxmini-用户所属企业的corpid
   */
  static readonly CORPID: string = 'corpid';

  /**
   * 系统默认头像
   */
  static readonly DEFAULT_AVATAR: string = 'defaultAvatar';

  /**
   * 身份证头像
   */
  static readonly ID_HEAD: string = 'idHead';

  /**
   * 身份证国徽
   */
  static readonly ID_NATIONAL: string = 'idNational';

  /**
   * 登陆code（最后一次）
   */
  static readonly JS_CODE: string = 'jsCode';

  /**
   * 用户最后心跳时间
   */
  static readonly LAST_HEARTBEAT_TIME: string = 'lastHeartbeatTime';

  /**
   * 最后登陆时间
   */
  static readonly LAST_LOGIN_TIME: string = 'lastLoginTime';

  /**
   * 用户昵称
   */
  static readonly NICK_NAME: string = 'nickName';

  /**
   * wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid
   */
  static readonly OPENID: string = 'openid';

  /**
   * 密码（小程序不需要）
   */
  static readonly PASSWORD: string = 'password';

  /**
   * 注册手机号
   */
  static readonly PHONE: string = 'phone';

  /**
   * 注册时间
   */
  static readonly REGISTER_TIME: string = 'registerTime';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 用户最后颁发token
   */
  static readonly TOKEN: string = 'token';

  /**
   * 用户性别[男 m 男，女 w 女]
   */
  static readonly USER_GENDER: string = 'userGender';

  /**
   * 用户真实姓名
   */
  static readonly USER_NAME: string = 'userName';
}

// @provide 用 工厂模式static model
export const factory = () => AppUserModel;
providerWrapper([
  {
    id: 'appUserModel',
    provider: factory,
  },
]);
