import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { FormCustomModel } from './form-custom.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 表单xrenderSchema
 */
export type IFormCustomSchemaModel = typeof FormCustomSchemaModel;

/**
 * 表单xrenderSchema
 */
@Table({
  tableName: 'form_custom_schema',
  comment: '表单xrenderSchema',
})
export class FormCustomSchemaModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * finish自定义函数
   */
  @Column({ comment: 'finish自定义函数', type: DataType.TEXT })
  finishFun?: string;
  /**
   * 提交graphql
   */
  @Column({ comment: '提交graphql', type: DataType.TEXT })
  finishGraphql?: string;
  /**
   * 主流程id
   */
  @ForeignKey(() => FormCustomModel)
  @Column({ comment: '主流程id', type: DataType.STRING(50) })
  formCustomId?: string;
  /**
   * 加载自定义函数
   */
  @Column({ comment: '加载自定义函数', type: DataType.TEXT })
  initFun?: string;
  /**
   * 加载graphql
   */
  @Column({ comment: '加载graphql', type: DataType.TEXT })
  initGraphql?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 自定义函数对象集合
   */
  @Column({ comment: '自定义函数对象集合', type: DataType.TEXT })
  reqFun?: string;
  /**
   * 类型form、list
   */
  @Column({ comment: '类型form、list', type: DataType.STRING(50) })
  type?: string;
  /**
   * gql地址
   */
  @Column({ comment: 'gql地址', type: DataType.STRING(50) })
  urlGraphql?: string;
  /**
   * 版本
   */
  @Column({ comment: '版本', type: DataType.INTEGER })
  version?: number;
  /**
   * schema
   */
  @Column({ comment: 'schema', type: DataType.JSON })
  xrender?: Record<string, any>;

  @BelongsTo(() => FormCustomModel, 'form_custom_id')
  formCustomIdObj: FormCustomModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class FORM_CUSTOM_SCHEMA {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * finish自定义函数
   */
  static readonly FINISH_FUN: string = 'finishFun';

  /**
   * 提交graphql
   */
  static readonly FINISH_GRAPHQL: string = 'finishGraphql';

  /**
   * 主流程id
   */
  static readonly FORM_CUSTOM_ID: string = 'formCustomId';

  /**
   * 加载自定义函数
   */
  static readonly INIT_FUN: string = 'initFun';

  /**
   * 加载graphql
   */
  static readonly INIT_GRAPHQL: string = 'initGraphql';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 自定义函数对象集合
   */
  static readonly REQ_FUN: string = 'reqFun';

  /**
   * 类型form、list
   */
  static readonly TYPE: string = 'type';

  /**
   * gql地址
   */
  static readonly URL_GRAPHQL: string = 'urlGraphql';

  /**
   * 版本
   */
  static readonly VERSION: string = 'version';

  /**
   * schema
   */
  static readonly XRENDER: string = 'xrender';

}

// @provide 用 工厂模式static model
export const factory = () => FormCustomSchemaModel;
providerWrapper([
  {
    id: 'formCustomSchemaModel',
    provider: factory,
  },
]);

