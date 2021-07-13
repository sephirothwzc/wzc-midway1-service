import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { RoleModel } from './role.model';
import { ComponentControlerModel } from './component-controler.model';
// #region enum
export enum EComponentControlerRoleAuthState {
  /**
   * 只读可见
   */
  view = 'view',
  /**
   * 可见可操作
   */
  operation = 'operation',
  /**
   * 没有权限
   */
  none = 'none',

}


// #endregion

// 依赖注入 导出类型
/**
 * 控件角色
 */
export type IComponentControlerRoleModel = typeof ComponentControlerRoleModel;

/**
 * 控件角色
 */
@Table({
  tableName: 'component_controler_role',
  comment: '控件角色',
})
export class ComponentControlerRoleModel extends BaseModel {
  /**
   * app_client
   */
  @ForeignKey(() => AppClientModel)
  @Column({ comment: 'app_client', type: DataType.STRING(50) })
  appId?: string;
  /**
   * 权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]
   */
  @Column({ comment: '权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]', type: DataType.STRING(50) })
  authState?: EComponentControlerRoleAuthState;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 控件id
   */
  @ForeignKey(() => ComponentControlerModel)
  @Column({ comment: '控件id', type: DataType.STRING(50) })
  componentControlerId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 角色id
   */
  @ForeignKey(() => RoleModel)
  @Column({ comment: '角色id', type: DataType.STRING(50) })
  roleId?: string;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => RoleModel, 'role_id')
  roleIdObj: RoleModel;

  @BelongsTo(() => ComponentControlerModel, 'component_controler_id')
  componentControlerIdObj: ComponentControlerModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class COMPONENT_CONTROLER_ROLE {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]
   */
  static readonly AUTH_STATE: string = 'authState';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 控件id
   */
  static readonly COMPONENT_CONTROLER_ID: string = 'componentControlerId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 角色id
   */
  static readonly ROLE_ID: string = 'roleId';

}

// @provide 用 工厂模式static model
export const factory = () => ComponentControlerRoleModel;
providerWrapper([
  {
    id: 'componentControlerRoleModel',
    provider: factory,
  },
]);

