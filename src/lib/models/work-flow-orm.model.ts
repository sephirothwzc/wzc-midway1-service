import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { WorkFlowModel } from './work-flow.model';
import { AppUserModel } from './app-user.model';
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
   * 节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认
   */
  @Column({ comment: '节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认', type: DataType.STRING(50) })
  dataStatus?: string;
  /**
   * 发起人id
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '发起人id', type: DataType.STRING(50) })
  formUserId?: string;
  /**
   * 经手人id
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '经手人id', type: DataType.STRING(50) })
  managerUserId?: string;
  /**
   * 流程节点id
   */
  @Column({ comment: '流程节点id', type: DataType.STRING(50) })
  nodeId?: string;
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
  /**
   * 节点值true、false
   */
  @Column({ comment: '节点值true、false', type: DataType.STRING(50) })
  statusValue?: string;
  /**
   * 承办人id
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '承办人id', type: DataType.STRING(50) })
  undertakeUserId?: string;
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

  @BelongsTo(() => AppUserModel, 'form_user_id')
  formUserIdObj: AppUserModel;

  @BelongsTo(() => AppUserModel, 'manager_user_id')
  managerUserIdObj: AppUserModel;

  @BelongsTo(() => AppUserModel, 'undertake_user_id')
  undertakeUserIdObj: AppUserModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class WORK_FLOW_ORM {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认
   */
  static readonly DATA_STATUS: string = 'dataStatus';

  /**
   * 发起人id
   */
  static readonly FORM_USER_ID: string = 'formUserId';

  /**
   * 经手人id
   */
  static readonly MANAGER_USER_ID: string = 'managerUserId';

  /**
   * 流程节点id
   */
  static readonly NODE_ID: string = 'nodeId';

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

  /**
   * 节点值true、false
   */
  static readonly STATUS_VALUE: string = 'statusValue';

  /**
   * 承办人id
   */
  static readonly UNDERTAKE_USER_ID: string = 'undertakeUserId';

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

