import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
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
   * 经手人id
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '经手人id', type: DataType.STRING(50) })
  managerUserId?: string;
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
   * 发起人id
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '发起人id', type: DataType.STRING(50) })
  workFlowOrmId?: string;

  @BelongsTo(() => AppUserModel, 'work_flow_orm_id')
  workFlowOrmIdObj: AppUserModel;

  @BelongsTo(() => AppUserModel, 'form_user_id')
  formUserIdObj: AppUserModel;

  @BelongsTo(() => AppUserModel, 'manager_user_id')
  managerUserIdObj: AppUserModel;

  @BelongsTo(() => AppUserModel, 'undertake_user_id')
  undertakeUserIdObj: AppUserModel;

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
   * 经手人id
   */
  static readonly MANAGER_USER_ID: string = 'managerUserId';

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
   * 发起人id
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

