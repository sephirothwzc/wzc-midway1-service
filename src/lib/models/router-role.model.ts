import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { RoleModel } from './role.model';
import { RouterModel } from './router.model';
// #region enum
export enum ERouterRoleAuthState {
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
 * 路由角色关系
 */
export type IRouterRoleModel = typeof RouterRoleModel;

/**
 * 路由角色关系
 */
@Table({
  tableName: 'router_role',
  comment: '路由角色关系',
})
export class RouterRoleModel extends BaseModel {
  /**
   * 权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]
   */
  @Column({ comment: '权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]', type: DataType.STRING(50) })
  authState?: ERouterRoleAuthState;
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
   * 角色
   */
  @ForeignKey(() => RoleModel)
  @Column({ comment: '角色', type: DataType.STRING(50) })
  roleId?: string;
  /**
   * 路由id
   */
  @ForeignKey(() => RouterModel)
  @Column({ comment: '路由id', type: DataType.STRING(50) })
  routerId?: string;

  @BelongsTo(() => RoleModel, 'role_id')
  roleIdObj: RoleModel;

  @BelongsTo(() => RouterModel, 'router_id')
  routerIdObj: RouterModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class ROUTER_ROLE {

  /**
   * 权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]
   */
  static readonly AUTH_STATE: string = 'authState';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 角色
   */
  static readonly ROLE_ID: string = 'roleId';

  /**
   * 路由id
   */
  static readonly ROUTER_ID: string = 'routerId';

}

// @provide 用 工厂模式static model
export const factory = () => RouterRoleModel;
providerWrapper([
  {
    id: 'routerRoleModel',
    provider: factory,
  },
]);

