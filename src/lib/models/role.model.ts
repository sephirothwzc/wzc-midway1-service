import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';

// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 角色
 */
export type IRoleModel = typeof RoleModel;

/**
 * 角色
 */
@Table({
  tableName: 'role',
  comment: '角色',
})
export class RoleModel extends BaseModel {
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
   * 角色编码
   */
  @Column({ comment: '角色编码', type: DataType.STRING(50) })
  roleCode: string;
  /**
   * 角色名称
   */
  @Column({ comment: '角色名称', type: DataType.STRING(50) })
  roleName: string;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class ROLE {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 角色编码
   */
  static readonly ROLE_CODE: string = 'roleCode';

  /**
   * 角色名称
   */
  static readonly ROLE_NAME: string = 'roleName';

}

// @provide 用 工厂模式static model
export const factory = () => RoleModel;
providerWrapper([
  {
    id: 'roleModel',
    provider: factory,
  },
]);

