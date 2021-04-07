import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { RoleModel } from './role.model';
import { RoleGroupModel } from './role-group.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 角色组明细
 */
export type IRoleGroupItemModel = typeof RoleGroupItemModel;

/**
 * 角色组明细
 */
@Table({
  tableName: 'role_group_item',
  comment: '角色组明细',
})
export class RoleGroupItemModel extends BaseModel {
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
   * 角色组id
   */
  @ForeignKey(() => RoleGroupModel)
  @Column({ comment: '角色组id', type: DataType.STRING(50) })
  roleGroupId?: string;
  /**
   * 角色id
   */
  @ForeignKey(() => RoleModel)
  @Column({ comment: '角色id', type: DataType.STRING(50) })
  roleId?: string;
  /**
   * 权重
   */
  @Column({ comment: '权重', type: DataType.INTEGER })
  weight?: number;

  @BelongsTo(() => RoleModel, 'role_id')
  roleIdObj: RoleModel;

  @BelongsTo(() => RoleGroupModel, 'role_group_id')
  roleGroupIdObj: RoleGroupModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class ROLE_GROUP_ITEM {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 角色组id
   */
  static readonly ROLE_GROUP_ID: string = 'roleGroupId';

  /**
   * 角色id
   */
  static readonly ROLE_ID: string = 'roleId';

  /**
   * 权重
   */
  static readonly WEIGHT: string = 'weight';

}

// @provide 用 工厂模式static model
export const factory = () => RoleGroupItemModel;
providerWrapper([
  {
    id: 'roleGroupItemModel',
    provider: factory,
  },
]);

