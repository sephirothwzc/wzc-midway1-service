import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { WorkFlowModel } from './work-flow.model';
import { AppUserModel } from './app-user.model';
import { WorkFlowOrmUserModel } from './work-flow-orm-user.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 工作流表单记录
 */
export type IWorkFlowOrmModel = typeof WorkFlowOrmModel;

/**
 * 工作流表单记录
 */
@Table({
  tableName: 'work_flow_orm',
  comment: '工作流表单记录',
})
export class WorkFlowOrmModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 创建人id
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '创建人id', type: DataType.STRING(50) })
  createWorkId?: string;
  /**
   * 节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认
   */
  @Column({ comment: '节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认', type: DataType.STRING(50) })
  dataStatus?: string;
  /**
   * 流程节点id
   */
  @Column({ comment: '流程节点id', type: DataType.STRING(50) })
  nodeId?: string;
  /**
   * 工作流节点名称
   */
  @Column({ comment: '工作流节点名称', type: DataType.STRING(200) })
  nodeName?: string;
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
   * 驳回备注
   */
  @Column({ comment: '驳回备注', type: DataType.STRING(500) })
  rejectRemark?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 节点值true、false
   */
  @Column({ comment: '节点值true、false', type: DataType.STRING(50) })
  statusValue?: string;
  /**
   * 合同id
   */
  @ForeignKey(() => WorkFlowModel)
  @Column({ comment: '合同id', type: DataType.STRING(50) })
  workFlowId?: string;
  /**
   * 节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办
   */
  @Column({ comment: '节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办', type: DataType.STRING(50) })
  workType?: string;

  @BelongsTo(() => WorkFlowModel, 'work_flow_id')
  workFlowIdObj: WorkFlowModel;

  @BelongsTo(() => AppUserModel, 'create_work_id')
  createWorkIdObj: AppUserModel;

  @HasMany(() => WorkFlowOrmUserModel, 'work_flow_orm_id')
  workFlowOrmUserWorkFlowOrmId: Array<WorkFlowOrmUserModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class WORK_FLOW_ORM {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 创建人id
   */
  static readonly CREATE_WORK_ID: string = 'createWorkId';

  /**
   * 节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认
   */
  static readonly DATA_STATUS: string = 'dataStatus';

  /**
   * 流程节点id
   */
  static readonly NODE_ID: string = 'nodeId';

  /**
   * 工作流节点名称
   */
  static readonly NODE_NAME: string = 'nodeName';

  /**
   * 具体类型id
   */
  static readonly ORM_ID: string = 'ormId';

  /**
   * 类型project、budget、contract
   */
  static readonly ORM_TYPE: string = 'ormType';

  /**
   * 驳回备注
   */
  static readonly REJECT_REMARK: string = 'rejectRemark';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 节点值true、false
   */
  static readonly STATUS_VALUE: string = 'statusValue';

  /**
   * 合同id
   */
  static readonly WORK_FLOW_ID: string = 'workFlowId';

  /**
   * 节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办
   */
  static readonly WORK_TYPE: string = 'workType';

}

// @provide 用 工厂模式static model
export const factory = () => WorkFlowOrmModel;
providerWrapper([
  {
    id: 'workFlowOrmModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: WorkFlowOrmModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.workFlowOrmUserWorkFlowOrmId) {
      return {};
    }
    const include: any = [];
    param.workFlowOrmUserWorkFlowOrmId &&
      param.workFlowOrmUserWorkFlowOrmId.length > 0 &&
      include.push({ model: WorkFlowOrmUserModel, as: 'workFlowOrmUserWorkFlowOrmId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'workFlowOrmModel.createOptions',
    provider: createOptions,
  },
]);

