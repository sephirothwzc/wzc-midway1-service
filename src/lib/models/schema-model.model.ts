import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { BusinessSchemaModel } from './business-schema.model';
import { AppClientModel } from './app-client.model';
import { SchemaModelRoleModel } from './schema-model-role.model';
// #region enum
export enum ESchemaModelCode {
  /**
   *
   */
  unique = 'unique',

}

export enum ESchemaModelName {
  /**
   *
   */
  unique = 'unique',

}

export enum ESchemaModelSchemaType {
  /**
   * 对象
   */
  model = 'model',
  /**
   * 属性
   */
  property = 'property',

}


// #endregion

// 依赖注入 导出类型
/**
 * graphql-schema-model
 */
export type ISchemaModelModel = typeof SchemaModelModel;

/**
 * graphql-schema-model
 */
@Table({
  tableName: 'schema_model',
  comment: 'graphql-schema-model',
})
export class SchemaModelModel extends BaseModel {
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
   * 编码[unique]
   */
  @Column({ comment: '编码[unique]', type: DataType.STRING(50) })
  code?: ESchemaModelCode;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(50) })
  comment?: string;
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
   * 索引json
   */
  @Column({ comment: '索引json', type: DataType.JSON })
  indexJson?: Record<string, any>;
  /**
   * 名称[unique]
   */
  @Column({ comment: '名称[unique]', type: DataType.STRING(50) })
  name?: ESchemaModelName;
  /**
   * 父级别
   */
  @ForeignKey(() => SchemaModelModel)
  @Column({ comment: '父级别', type: DataType.STRING(50) })
  parentId?: string;
  /**
   * 属性json
   */
  @Column({ comment: '属性json', type: DataType.JSON })
  propertyJson?: Record<string, any>;
  /**
   * 属性类型
   */
  @Column({ comment: '属性类型', type: DataType.STRING(50) })
  propertyType?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * [model model 对象,property property 属性]
   */
  @Column({ comment: '[model model 对象,property property 属性]', type: DataType.STRING(50) })
  schemaType?: ESchemaModelSchemaType;

  @HasMany(() => BusinessSchemaModel, 'schema_model_id')
  businessSchemaSchemaModelId: Array<BusinessSchemaModel>;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => SchemaModelModel, 'parent_id')
  parentIdObj: SchemaModelModel;

  @HasMany(() => SchemaModelModel, 'parent_id')
  schemaModelParentId: Array<SchemaModelModel>;

  @HasMany(() => SchemaModelRoleModel, 'schema_model_id')
  schemaModelRoleSchemaModelId: Array<SchemaModelRoleModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class SCHEMA_MODEL {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 编码[unique]
   */
  static readonly CODE: string = 'code';

  /**
   * 备注
   */
  static readonly COMMENT: string = 'comment';

  /**
   * 显示编码
   */
  static readonly DISPLAY_CODE: string = 'displayCode';

  /**
   * 显示文本
   */
  static readonly DISPLAY_TXT: string = 'displayTxt';

  /**
   * 索引json
   */
  static readonly INDEX_JSON: string = 'indexJson';

  /**
   * 名称[unique]
   */
  static readonly NAME: string = 'name';

  /**
   * 父级别
   */
  static readonly PARENT_ID: string = 'parentId';

  /**
   * 属性json
   */
  static readonly PROPERTY_JSON: string = 'propertyJson';

  /**
   * 属性类型
   */
  static readonly PROPERTY_TYPE: string = 'propertyType';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * [model model 对象,property property 属性]
   */
  static readonly SCHEMA_TYPE: string = 'schemaType';

}

// @provide 用 工厂模式static model
export const factory = () => SchemaModelModel;
providerWrapper([
  {
    id: 'schemaModelModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: SchemaModelModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.businessSchemaSchemaModelId && !param.schemaModelParentId && !param.schemaModelRoleSchemaModelId) {
      return {};
    }
    const include: any = [];
    param.businessSchemaSchemaModelId &&
      param.businessSchemaSchemaModelId.length > 0 &&
      include.push({ model: BusinessSchemaModel, as: 'businessSchemaSchemaModelId' });
    param.schemaModelParentId &&
      param.schemaModelParentId.length > 0 &&
      include.push({ model: SchemaModelModel, as: 'schemaModelParentId' });
    param.schemaModelRoleSchemaModelId &&
      param.schemaModelRoleSchemaModelId.length > 0 &&
      include.push({ model: SchemaModelRoleModel, as: 'schemaModelRoleSchemaModelId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'schemaModelModel.createOptions',
    provider: createOptions,
  },
]);

