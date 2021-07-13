import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { RoleModel } from './role.model';
import { BusinessRuleModel } from './business-rule.model';
import { SchemaModelModel } from './schema-model.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 业务角色关系
 */
export type IBusinessSchemaModel = typeof BusinessSchemaModel;

/**
 * 业务角色关系
 */
@Table({
  tableName: 'business_schema',
  comment: '业务角色关系',
})
export class BusinessSchemaModel extends BaseModel {
  /**
   * app_client
   */
  @ForeignKey(() => AppClientModel)
  @Column({ comment: 'app_client', type: DataType.STRING(50) })
  appId?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 角色
   */
  @ForeignKey(() => BusinessRuleModel)
  @Column({ comment: '角色', type: DataType.STRING(50) })
  businessRuleId?: string;
  /**
   * 显示编码
   */
  @Column({ comment: '显示编码', type: DataType.STRING(100) })
  displayCode?: string;
  /**
   * 显示文本
   */
  @Column({ comment: '显示文本', type: DataType.STRING(100) })
  displayTxt?: string;
  /**
   * 属性json
   */
  @Column({ comment: '属性json', type: DataType.JSON })
  propertyJson?: Record<string, any>;
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
   * 对象属性id
   */
  @ForeignKey(() => SchemaModelModel)
  @Column({ comment: '对象属性id', type: DataType.STRING(50) })
  schemaModelId?: string;
  /**
   * 默认值json
   */
  @Column({ comment: '默认值json', type: DataType.JSON })
  valueDefault?: Record<string, any>;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => RoleModel, 'role_id')
  roleIdObj: RoleModel;

  @BelongsTo(() => BusinessRuleModel, 'business_rule_id')
  businessRuleIdObj: BusinessRuleModel;

  @BelongsTo(() => SchemaModelModel, 'schema_model_id')
  schemaModelIdObj: SchemaModelModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class BUSINESS_SCHEMA {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 角色
   */
  static readonly BUSINESS_RULE_ID: string = 'businessRuleId';

  /**
   * 显示编码
   */
  static readonly DISPLAY_CODE: string = 'displayCode';

  /**
   * 显示文本
   */
  static readonly DISPLAY_TXT: string = 'displayTxt';

  /**
   * 属性json
   */
  static readonly PROPERTY_JSON: string = 'propertyJson';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 角色
   */
  static readonly ROLE_ID: string = 'roleId';

  /**
   * 对象属性id
   */
  static readonly SCHEMA_MODEL_ID: string = 'schemaModelId';

  /**
   * 默认值json
   */
  static readonly VALUE_DEFAULT: string = 'valueDefault';

}

// @provide 用 工厂模式static model
export const factory = () => BusinessSchemaModel;
providerWrapper([
  {
    id: 'businessSchemaModel',
    provider: factory,
  },
]);

