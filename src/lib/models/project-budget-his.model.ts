import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ProjectModel } from './project.model';
import { ProjectHisModel } from './project-his.model';
import { BudgetModel } from './budget.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 项目预算关系表
 */
export type IProjectBudgetHisModel = typeof ProjectBudgetHisModel;

/**
 * 项目预算关系表
 */
@Table({
  tableName: 'project_budget_his',
  comment: '项目预算关系表',
})
export class ProjectBudgetHisModel extends BaseModel {
  /**
   * 预算id
   */
  @ForeignKey(() => BudgetModel)
  @Column({ comment: '预算id', type: DataType.STRING(50) })
  budgetId?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 项目id
   */
  @ForeignKey(() => ProjectHisModel)
  @Column({ comment: '项目id', type: DataType.STRING(50) })
  projectHisId?: string;
  /**
   * 项目id
   */
  @ForeignKey(() => ProjectModel)
  @Column({ comment: '项目id', type: DataType.STRING(50) })
  projectId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @BelongsTo(() => ProjectModel, 'project_id')
  projectIdObj: ProjectModel;

  @BelongsTo(() => ProjectHisModel, 'project_his_id')
  projectHisIdObj: ProjectHisModel;

  @BelongsTo(() => BudgetModel, 'budget_id')
  budgetIdObj: BudgetModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class PROJECT_BUDGET_HIS {

  /**
   * 预算id
   */
  static readonly BUDGET_ID: string = 'budgetId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 项目id
   */
  static readonly PROJECT_HIS_ID: string = 'projectHisId';

  /**
   * 项目id
   */
  static readonly PROJECT_ID: string = 'projectId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => ProjectBudgetHisModel;
providerWrapper([
  {
    id: 'projectBudgetHisModel',
    provider: factory,
  },
]);

