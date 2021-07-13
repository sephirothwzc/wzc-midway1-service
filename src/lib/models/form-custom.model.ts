import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { FormCustomSchemaModel } from './form-custom-schema.model';
import { SchemaOrmModel } from './schema-orm.model';
import { WorkFlowModel } from './work-flow.model';
import { WorkFlowNodeFormModel } from './work-flow-node-form.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 自定义表单
 */
export type IFormCustomModel = typeof FormCustomModel;

/**
 * 自定义表单
 */
@Table({
  tableName: 'form_custom',
  comment: '自定义表单',
})
export class FormCustomModel extends BaseModel {
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
   * 显示文本
   */
  @Column({ comment: '显示文本', type: DataType.STRING(50) })
  displayTxt?: string;
  /**
   * 表单编号
   */
  @Column({ comment: '表单编号', type: DataType.STRING(50) })
  formCode?: string;
  /**
   * 表单名称
   */
  @Column({ comment: '表单名称', type: DataType.STRING(50) })
  formName?: string;
  /**
   * 表单参数
   */
  @Column({ comment: '表单参数', type: DataType.JSON })
  formParam?: Record<string, any>;
  /**
   * 表单路由参数
   */
  @Column({ comment: '表单路由参数', type: DataType.JSON })
  formQuery?: Record<string, any>;
  /**
   * 表单路由
   */
  @Column({ comment: '表单路由', type: DataType.STRING(200) })
  formUrl?: string;
  /**
   * 排序码
   */
  @Column({ comment: '排序码', type: DataType.INTEGER })
  orderNo: number;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 状态值
   */
  @Column({ comment: '状态值', type: DataType.STRING(20) })
  status?: string;
  /**
   * 步骤值
   */
  @Column({ comment: '步骤值', type: DataType.INTEGER })
  step?: number;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @HasMany(() => FormCustomSchemaModel, 'form_custom_id')
  formCustomSchemaFormCustomId: Array<FormCustomSchemaModel>;

  @HasMany(() => SchemaOrmModel, 'form_custom_id')
  schemaOrmFormCustomId: Array<SchemaOrmModel>;

  @HasMany(() => WorkFlowModel, 'form_custom_id')
  workFlowFormCustomId: Array<WorkFlowModel>;

  @HasMany(() => WorkFlowNodeFormModel, 'form_custom_id')
  workFlowNodeFormFormCustomId: Array<WorkFlowNodeFormModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class FORM_CUSTOM {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 显示文本
   */
  static readonly DISPLAY_TXT: string = 'displayTxt';

  /**
   * 表单编号
   */
  static readonly FORM_CODE: string = 'formCode';

  /**
   * 表单名称
   */
  static readonly FORM_NAME: string = 'formName';

  /**
   * 表单参数
   */
  static readonly FORM_PARAM: string = 'formParam';

  /**
   * 表单路由参数
   */
  static readonly FORM_QUERY: string = 'formQuery';

  /**
   * 表单路由
   */
  static readonly FORM_URL: string = 'formUrl';

  /**
   * 排序码
   */
  static readonly ORDER_NO: string = 'orderNo';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 状态值
   */
  static readonly STATUS: string = 'status';

  /**
   * 步骤值
   */
  static readonly STEP: string = 'step';

}

// @provide 用 工厂模式static model
export const factory = () => FormCustomModel;
providerWrapper([
  {
    id: 'formCustomModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: FormCustomModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.formCustomSchemaFormCustomId && !param.schemaOrmFormCustomId && !param.workFlowFormCustomId && !param.workFlowNodeFormFormCustomId) {
      return {};
    }
    const include: any = [];
    param.formCustomSchemaFormCustomId &&
      param.formCustomSchemaFormCustomId.length > 0 &&
      include.push({ model: FormCustomSchemaModel, as: 'formCustomSchemaFormCustomId' });
    param.schemaOrmFormCustomId &&
      param.schemaOrmFormCustomId.length > 0 &&
      include.push({ model: SchemaOrmModel, as: 'schemaOrmFormCustomId' });
    param.workFlowFormCustomId &&
      param.workFlowFormCustomId.length > 0 &&
      include.push({ model: WorkFlowModel, as: 'workFlowFormCustomId' });
    param.workFlowNodeFormFormCustomId &&
      param.workFlowNodeFormFormCustomId.length > 0 &&
      include.push({ model: WorkFlowNodeFormModel, as: 'workFlowNodeFormFormCustomId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'formCustomModel.createOptions',
    provider: createOptions,
  },
]);

