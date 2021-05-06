import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { FormCustomModel } from './form-custom.model';
import { WorkFlowOrmModel } from './work-flow-orm.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 工作流
 */
export type IWorkFlowModel = typeof WorkFlowModel;

/**
 * 工作流
 */
@Table({
  tableName: 'work_flow',
  comment: '工作流',
})
export class WorkFlowModel extends BaseModel {
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
   * 编码
   */
  @Column({ comment: '编码', type: DataType.STRING(50) })
  code?: string;
  /**
   * 表单id
   */
  @ForeignKey(() => FormCustomModel)
  @Column({ comment: '表单id', type: DataType.STRING(50) })
  formCustomId?: string;
  /**
   * 图形数据
   */
  @Column({ comment: '图形数据', type: DataType.JSON })
  graph?: Record<string, any>;
  /**
   * 名称
   */
  @Column({ comment: '名称', type: DataType.STRING(50) })
  name?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 版本
   */
  @Column({ comment: '版本', type: DataType.INTEGER })
  version?: number;

  @BelongsTo(() => FormCustomModel, 'form_custom_id')
  formCustomIdObj: FormCustomModel;

  @HasMany(() => WorkFlowOrmModel, 'work_flow_id')
  workFlowOrmWorkFlowId: Array<WorkFlowOrmModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class WORK_FLOW {

  /**
   * appName
   */
  static readonly APP_NAME: string = 'appName';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 编码
   */
  static readonly CODE: string = 'code';

  /**
   * 表单id
   */
  static readonly FORM_CUSTOM_ID: string = 'formCustomId';

  /**
   * 图形数据
   */
  static readonly GRAPH: string = 'graph';

  /**
   * 名称
   */
  static readonly NAME: string = 'name';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 版本
   */
  static readonly VERSION: string = 'version';

}

// @provide 用 工厂模式static model
export const factory = () => WorkFlowModel;
providerWrapper([
  {
    id: 'workFlowModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: WorkFlowModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.workFlowOrmWorkFlowId) {
      return {};
    }
    const include: any = [];
    param.workFlowOrmWorkFlowId &&
      param.workFlowOrmWorkFlowId.length > 0 &&
      include.push({ model: WorkFlowOrmModel, as: 'workFlowOrmWorkFlowId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'workFlowModel.createOptions',
    provider: createOptions,
  },
]);

