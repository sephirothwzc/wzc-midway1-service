import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { WorkFlowOrmModel } from './work-flow-orm.model';
import { AppUserModel } from './app-user.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 工作流表单记录关联人员用户
 */
export type IWorkFlowOrmUserModel = typeof WorkFlowOrmUserModel;

/**
 * 工作流表单记录关联人员用户
 */
@Table({
  tableName: 'work_flow_orm_user',
  comment: '工作流表单记录关联人员用户',
})
export class WorkFlowOrmUserModel extends BaseModel {
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
   * 处理人id
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '处理人id', type: DataType.STRING(50) })
  handleUserId?: string;
  /**
   * 经手人id
   */
  @Column({ comment: '经手人id', type: DataType.STRING(50) })
  managerUserId?: string;
  /**
   * 经手人类型AppUser,Role,RoleGroup,
   */
  @Column({ comment: '经手人类型AppUser,Role,RoleGroup,', type: DataType.STRING(50) })
  managerUserType?: string;
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
   * 节点值true、false、confirm 确认、end 结束、reject 驳回、abnormal 异常
   */
  @Column({ comment: '节点值true、false、confirm 确认、end 结束、reject 驳回、abnormal 异常', type: DataType.STRING(50) })
  statusValue?: string;
  /**
   * 承办人id
   */
  @Column({ comment: '承办人id', type: DataType.STRING(50) })
  undertakeUserId?: string;
  /**
   * 承办人类型AppUser,Role,RoleGroup,
   */
  @Column({ comment: '承办人类型AppUser,Role,RoleGroup,', type: DataType.STRING(50) })
  undertakeUserType?: string;
  /**
   * workfloworm
   */
  @ForeignKey(() => WorkFlowOrmModel)
  @Column({ comment: 'workfloworm', type: DataType.STRING(50) })
  workFlowOrmId?: string;

  @BelongsTo(() => WorkFlowOrmModel, 'work_flow_orm_id')
  workFlowOrmIdObj: WorkFlowOrmModel;

  @BelongsTo(() => AppUserModel, 'form_user_id')
  formUserIdObj: AppUserModel;

  @BelongsTo(() => AppUserModel, 'handle_user_id')
  handleUserIdObj: AppUserModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class WORK_FLOW_ORM_USER {

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
   * 处理人id
   */
  static readonly HANDLE_USER_ID: string = 'handleUserId';

  /**
   * 经手人id
   */
  static readonly MANAGER_USER_ID: string = 'managerUserId';

  /**
   * 经手人类型AppUser,Role,RoleGroup,
   */
  static readonly MANAGER_USER_TYPE: string = 'managerUserType';

  /**
   * 驳回备注
   */
  static readonly REJECT_REMARK: string = 'rejectRemark';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 节点值true、false、confirm 确认、end 结束、reject 驳回、abnormal 异常
   */
  static readonly STATUS_VALUE: string = 'statusValue';

  /**
   * 承办人id
   */
  static readonly UNDERTAKE_USER_ID: string = 'undertakeUserId';

  /**
   * 承办人类型AppUser,Role,RoleGroup,
   */
  static readonly UNDERTAKE_USER_TYPE: string = 'undertakeUserType';

  /**
   * workfloworm
   */
  static readonly WORK_FLOW_ORM_ID: string = 'workFlowOrmId';

}

// @provide 用 工厂模式static model
export const factory = () => WorkFlowOrmUserModel;
providerWrapper([
  {
    id: 'workFlowOrmUserModel',
    provider: factory,
  },
]);

