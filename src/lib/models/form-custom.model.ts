import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';

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
  tableName: 'form-custom',
  comment: '自定义表单',
})
export class FormCustomModel extends BaseModel {
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
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class FORM_CUSTOM {
  /**
   * appName
   */
  static readonly APP_NAME: string = 'appName';

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
