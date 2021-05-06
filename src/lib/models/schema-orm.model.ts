import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { FormCustomModel } from './form-custom.model';
import { FormCustomSchemaModel } from './form-custom-schema.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * playground schema by ormtable id
 */
export type ISchemaOrmModel = typeof SchemaOrmModel;

/**
 * playground schema by ormtable id
 */
@Table({
  tableName: 'schema_orm',
  comment: 'playground schema by ormtable id',
})
export class SchemaOrmModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 自定义表单id
   */
  @ForeignKey(() => FormCustomModel)
  @Column({ comment: '自定义表单id', type: DataType.STRING(50) })
  formCustomId?: string;
  /**
   * 自定义表单布局id
   */
  @ForeignKey(() => FormCustomSchemaModel)
  @Column({ comment: '自定义表单布局id', type: DataType.STRING(50) })
  formCustomSchemaId?: string;
  /**
   * 具体类型id
   */
  @Column({ comment: '具体类型id', type: DataType.STRING(50) })
  ormId?: string;
  /**
   * 类型project、budget、contract
   */
  @Column({ comment: '类型project、budget、contract', type: DataType.STRING(50) })
  ormType?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @BelongsTo(() => FormCustomModel, 'form_custom_id')
  formCustomIdObj: FormCustomModel;

  @BelongsTo(() => FormCustomSchemaModel, 'form_custom_schema_id')
  formCustomSchemaIdObj: FormCustomSchemaModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class SCHEMA_ORM {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 自定义表单id
   */
  static readonly FORM_CUSTOM_ID: string = 'formCustomId';

  /**
   * 自定义表单布局id
   */
  static readonly FORM_CUSTOM_SCHEMA_ID: string = 'formCustomSchemaId';

  /**
   * 具体类型id
   */
  static readonly ORM_ID: string = 'ormId';

  /**
   * 类型project、budget、contract
   */
  static readonly ORM_TYPE: string = 'ormType';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => SchemaOrmModel;
providerWrapper([
  {
    id: 'schemaOrmModel',
    provider: factory,
  },
]);

