import { Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { BusinessSchemaModel } from './business-schema.model';
import { ComponentControlerRoleModel } from './component-controler-role.model';
import { RoleGroupItemModel } from './role-group-item.model';
import { RouterRoleModel } from './router-role.model';
import { SchemaModelRoleModel } from './schema-model-role.model';
import { WebapiRoleModel } from './webapi-role.model';
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
  /**
   * 权重
   */
  @Column({ comment: '权重', type: DataType.INTEGER })
  weight?: number;

  @HasMany(() => BusinessSchemaModel, 'role_id')
  businessSchemaRoleId: Array<BusinessSchemaModel>;

  @HasMany(() => ComponentControlerRoleModel, 'role_id')
  componentControlerRoleRoleId: Array<ComponentControlerRoleModel>;

  @HasMany(() => RoleGroupItemModel, 'role_id')
  roleGroupItemRoleId: Array<RoleGroupItemModel>;

  @HasMany(() => RouterRoleModel, 'role_id')
  routerRoleRoleId: Array<RouterRoleModel>;

  @HasMany(() => SchemaModelRoleModel, 'role_id')
  schemaModelRoleRoleId: Array<SchemaModelRoleModel>;

  @HasMany(() => WebapiRoleModel, 'role_id')
  webapiRoleRoleId: Array<WebapiRoleModel>;

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

  /**
   * 权重
   */
  static readonly WEIGHT: string = 'weight';

}

// @provide 用 工厂模式static model
export const factory = () => RoleModel;
providerWrapper([
  {
    id: 'roleModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: RoleModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.businessSchemaRoleId && !param.componentControlerRoleRoleId && !param.roleGroupItemRoleId && !param.routerRoleRoleId && !param.schemaModelRoleRoleId && !param.webapiRoleRoleId) {
      return {};
    }
    const include: any = [];
    param.businessSchemaRoleId &&
      param.businessSchemaRoleId.length > 0 &&
      include.push({ model: BusinessSchemaModel, as: 'businessSchemaRoleId' });
    param.componentControlerRoleRoleId &&
      param.componentControlerRoleRoleId.length > 0 &&
      include.push({ model: ComponentControlerRoleModel, as: 'componentControlerRoleRoleId' });
    param.roleGroupItemRoleId &&
      param.roleGroupItemRoleId.length > 0 &&
      include.push({ model: RoleGroupItemModel, as: 'roleGroupItemRoleId' });
    param.routerRoleRoleId &&
      param.routerRoleRoleId.length > 0 &&
      include.push({ model: RouterRoleModel, as: 'routerRoleRoleId' });
    param.schemaModelRoleRoleId &&
      param.schemaModelRoleRoleId.length > 0 &&
      include.push({ model: SchemaModelRoleModel, as: 'schemaModelRoleRoleId' });
    param.webapiRoleRoleId &&
      param.webapiRoleRoleId.length > 0 &&
      include.push({ model: WebapiRoleModel, as: 'webapiRoleRoleId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'roleModel.createOptions',
    provider: createOptions,
  },
]);

