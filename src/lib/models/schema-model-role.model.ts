import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { RoleModel } from './role.model';
import { SchemaModelModel } from './schema-model.model';
// #region enum
export enum ESchemaModelRoleAuthState {
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

export enum ESchemaModelRoleDataState {
  /**
   * 只看自己
   */
  onlyOne = 'onlyOne',
  /**
   * 可见可操作
   */
  all = 'all',
  /**
   * 权限编码
   */
  businessCode = 'businessCode',

}


// #endregion

// 依赖注入 导出类型
/**
 * model角色关系表
 */
export type ISchemaModelRoleModel = typeof SchemaModelRoleModel;

/**
 * model角色关系表
 */
@Table({
  tableName: 'schema_model_role',
  comment: 'model角色关系表',
})
export class SchemaModelRoleModel extends BaseModel {
  /**
   * 权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]
   */
  @Column({ comment: '权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]', type: DataType.STRING(50) })
  authState?: ESchemaModelRoleAuthState;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 业务权限规则编码
   */
  @Column({ comment: '业务权限规则编码', type: DataType.JSON })
  businessValue?: Record<string, any>;
  /**
   * 权限[onlyOne onlyOne 只看自己，all all 可见可操作，businessCode businessCode 权限编码]
   */
  @Column({ comment: '权限[onlyOne onlyOne 只看自己，all all 可见可操作，businessCode businessCode 权限编码]', type: DataType.STRING(50) })
  dataState?: ESchemaModelRoleDataState;
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
  @ForeignKey(() => SchemaModelModel)
  @Column({ comment: '对象id', type: DataType.STRING(50) })
  schemaModelId?: string;

  @BelongsTo(() => RoleModel, 'role_id')
  roleIdObj: RoleModel;

  @BelongsTo(() => SchemaModelModel, 'schema_model_id')
  schemaModelIdObj: SchemaModelModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class SCHEMA_MODEL_ROLE {

  /**
   * 权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]
   */
  static readonly AUTH_STATE: string = 'authState';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 业务权限规则编码
   */
  static readonly BUSINESS_VALUE: string = 'businessValue';

  /**
   * 权限[onlyOne onlyOne 只看自己，all all 可见可操作，businessCode businessCode 权限编码]
   */
  static readonly DATA_STATE: string = 'dataState';

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
  static readonly SCHEMA_MODEL_ID: string = 'schemaModelId';

}

// @provide 用 工厂模式static model
export const factory = () => SchemaModelRoleModel;
providerWrapper([
  {
    id: 'schemaModelRoleModel',
    provider: factory,
  },
]);

