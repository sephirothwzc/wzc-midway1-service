import { Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { RoleGroupItemModel } from './role-group-item.model';
// #region enum
export enum ERoleGroupGroupCode {
  /**
   *
   */
  unique = 'unique',

}

export enum ERoleGroupGroupName {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * 角色组
 */
export type IRoleGroupModel = typeof RoleGroupModel;

/**
 * 角色组
 */
@Table({
  tableName: 'role_group',
  comment: '角色组',
})
export class RoleGroupModel extends BaseModel {
  /**
   * appName
   */
  @Column({ comment: 'appName', type: DataType.STRING(50) })
  appName?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 组编号[unique]
   */
  @Column({ comment: '组编号[unique]', type: DataType.STRING(50) })
  groupCode?: ERoleGroupGroupCode;
  /**
   * 组名[unique]
   */
  @Column({ comment: '组名[unique]', type: DataType.STRING(50) })
  groupName?: ERoleGroupGroupName;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @HasMany(() => RoleGroupItemModel, 'role_group_id')
  roleGroupItemRoleGroupId: Array<RoleGroupItemModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class ROLE_GROUP {

  /**
   * appName
   */
  static readonly APP_NAME: string = 'appName';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 组编号[unique]
   */
  static readonly GROUP_CODE: string = 'groupCode';

  /**
   * 组名[unique]
   */
  static readonly GROUP_NAME: string = 'groupName';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => RoleGroupModel;
providerWrapper([
  {
    id: 'roleGroupModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: RoleGroupModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.roleGroupItemRoleGroupId) {
      return {};
    }
    const include: any = [];
    param.roleGroupItemRoleGroupId &&
      param.roleGroupItemRoleGroupId.length > 0 &&
      include.push({ model: RoleGroupItemModel, as: 'roleGroupItemRoleGroupId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'roleGroupModel.createOptions',
    provider: createOptions,
  },
]);

