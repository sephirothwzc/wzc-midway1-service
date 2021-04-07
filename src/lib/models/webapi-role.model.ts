import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { RoleModel } from './role.model';
import { WebapiModel } from './webapi.model';
// #region enum
export enum EWebapiRoleAuthState {
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
 * 
 */
export type IWebapiRoleModel = typeof WebapiRoleModel;

/**
 * 
 */
@Table({
  tableName: 'webapi_role',
  comment: '',
})
export class WebapiRoleModel extends BaseModel {
  /**
   * 权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]
   */
  @Column({ comment: '权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]', type: DataType.STRING(50) })
  authState?: EWebapiRoleAuthState;
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
   * 对象id
   */
  @ForeignKey(() => WebapiModel)
  @Column({ comment: '对象id', type: DataType.STRING(50) })
  webapiId?: string;

  @BelongsTo(() => RoleModel, 'role_id')
  roleIdObj: RoleModel;

  @BelongsTo(() => WebapiModel, 'webapi_id')
  webapiIdObj: WebapiModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class WEBAPI_ROLE {

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
   * 对象id
   */
  static readonly WEBAPI_ID: string = 'webapiId';

}

// @provide 用 工厂模式static model
export const factory = () => WebapiRoleModel;
providerWrapper([
  {
    id: 'webapiRoleModel',
    provider: factory,
  },
]);

