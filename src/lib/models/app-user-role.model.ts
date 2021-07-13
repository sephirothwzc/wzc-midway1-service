import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { AppUserModel } from './app-user.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 用户角色关系
 */
export type IAppUserRoleModel = typeof AppUserRoleModel;

/**
 * 用户角色关系
 */
@Table({
  tableName: 'app_user_role',
  comment: '用户角色关系',
})
export class AppUserRoleModel extends BaseModel {
  /**
   * app_client
   */
  @ForeignKey(() => AppClientModel)
  @Column({ comment: 'app_client', type: DataType.STRING(50) })
  appId?: string;
  /**
   * 用户
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '用户', type: DataType.STRING(50) })
  appUserId?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * role、roleGroup
   */
  @Column({ comment: 'role、roleGroup', type: DataType.STRING(50) })
  roleType?: string;
  /**
   * 角色id、角色组id
   */
  @Column({ comment: '角色id、角色组id', type: DataType.STRING(50) })
  typeId?: string;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => AppUserModel, 'app_user_id')
  appUserIdObj: AppUserModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class APP_USER_ROLE {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 用户
   */
  static readonly APP_USER_ID: string = 'appUserId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * role、roleGroup
   */
  static readonly ROLE_TYPE: string = 'roleType';

  /**
   * 角色id、角色组id
   */
  static readonly TYPE_ID: string = 'typeId';

}

// @provide 用 工厂模式static model
export const factory = () => AppUserRoleModel;
providerWrapper([
  {
    id: 'appUserRoleModel',
    provider: factory,
  },
]);

