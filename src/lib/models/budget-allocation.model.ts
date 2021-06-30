import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ProjectModel } from './project.model';
import { BudgetModel } from './budget.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 预算调拨
 */
export type IBudgetAllocationModel = typeof BudgetAllocationModel;

/**
 * 预算调拨
 */
@Table({
  tableName: 'budget_allocation',
  comment: '预算调拨',
})
export class BudgetAllocationModel extends BaseModel {
  /**
   * 预算金额
   */
  @Column({ comment: '预算金额', type: DataType.INTEGER })
  amount?: number;
  /**
   * 预算aid
   */
  @ForeignKey(() => BudgetModel)
  @Column({ comment: '预算aid', type: DataType.STRING(50) })
  budgetAid?: string;
  /**
   * 预算bid
   */
  @ForeignKey(() => BudgetModel)
  @Column({ comment: '预算bid', type: DataType.STRING(50) })
  budgetBid?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 项目aid
   */
  @ForeignKey(() => ProjectModel)
  @Column({ comment: '项目aid', type: DataType.STRING(50) })
  projectAid?: string;
  /**
   * 项目bid
   */
  @ForeignKey(() => ProjectModel)
  @Column({ comment: '项目bid', type: DataType.STRING(50) })
  projectBid?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @BelongsTo(() => ProjectModel, 'project_aid')
  projectAidObj: ProjectModel;

  @BelongsTo(() => BudgetModel, 'budget_aid')
  budgetAidObj: BudgetModel;

  @BelongsTo(() => ProjectModel, 'project_bid')
  projectBidObj: ProjectModel;

  @BelongsTo(() => BudgetModel, 'budget_bid')
  budgetBidObj: BudgetModel;

  @HasMany(() => BudgetModel, 'budget_allocation_id')
  budgetBudgetAllocationId: Array<BudgetModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class BUDGET_ALLOCATION {

  /**
   * 预算金额
   */
  static readonly AMOUNT: string = 'amount';

  /**
   * 预算aid
   */
  static readonly BUDGET_AID: string = 'budgetAid';

  /**
   * 预算bid
   */
  static readonly BUDGET_BID: string = 'budgetBid';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 项目aid
   */
  static readonly PROJECT_AID: string = 'projectAid';

  /**
   * 项目bid
   */
  static readonly PROJECT_BID: string = 'projectBid';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => BudgetAllocationModel;
providerWrapper([
  {
    id: 'budgetAllocationModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: BudgetAllocationModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.budgetBudgetAllocationId) {
      return {};
    }
    const include: any = [];
    param.budgetBudgetAllocationId &&
      param.budgetBudgetAllocationId.length > 0 &&
      include.push({ model: BudgetModel, as: 'budgetBudgetAllocationId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'budgetAllocationModel.createOptions',
    provider: createOptions,
  },
]);

