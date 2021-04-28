import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { BudgetFileModel } from './budget-file.model';
import { OrganizationModel } from './organization.model';
import { ContractModel } from './contract.model';
import { ProjectBudgetHisModel } from './project-budget-his.model';
import { ProjectBudgetModel } from './project-budget.model';
// #region enum
export enum EBudgetBudgetCode {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * 预算
 */
export type IBudgetModel = typeof BudgetModel;

/**
 * 预算
 */
@Table({
  tableName: 'budget',
  comment: '预算',
})
export class BudgetModel extends BaseModel {
  /**
   * 预算编号[unique]
   */
  @Column({ comment: '预算编号[unique]', type: DataType.STRING(50) })
  budgetCode?: EBudgetBudgetCode;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 科室id
   */
  @ForeignKey(() => OrganizationModel)
  @Column({ comment: '科室id', type: DataType.STRING(50) })
  department?: string;
  /**
   * 支出金额
   */
  @Column({ comment: '支出金额', type: DataType.INTEGER })
  expenditureMoney?: number;
  /**
   * 收入金额
   */
  @Column({ comment: '收入金额', type: DataType.INTEGER })
  incomeMoney?: number;
  /**
   * 预算原则
   */
  @Column({ comment: '预算原则', type: DataType.STRING(50) })
  principle?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 预算状态
   */
  @Column({ comment: '预算状态', type: DataType.STRING(50) })
  status?: string;

  @HasMany(() => BudgetFileModel, 'budget_id')
  budgetFileBudgetId: Array<BudgetFileModel>;

  @BelongsTo(() => OrganizationModel, 'department')
  departmentObj: OrganizationModel;

  @HasMany(() => ContractModel, 'budget_id')
  contractBudgetId: Array<ContractModel>;

  @HasMany(() => ProjectBudgetHisModel, 'budget_id')
  projectBudgetHisBudgetId: Array<ProjectBudgetHisModel>;

  @HasMany(() => ProjectBudgetModel, 'budget_id')
  projectBudgetBudgetId: Array<ProjectBudgetModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class BUDGET {

  /**
   * 预算编号[unique]
   */
  static readonly BUDGET_CODE: string = 'budgetCode';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 科室id
   */
  static readonly DEPARTMENT: string = 'department';

  /**
   * 支出金额
   */
  static readonly EXPENDITURE_MONEY: string = 'expenditureMoney';

  /**
   * 收入金额
   */
  static readonly INCOME_MONEY: string = 'incomeMoney';

  /**
   * 预算原则
   */
  static readonly PRINCIPLE: string = 'principle';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 预算状态
   */
  static readonly STATUS: string = 'status';

}

// @provide 用 工厂模式static model
export const factory = () => BudgetModel;
providerWrapper([
  {
    id: 'budgetModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: BudgetModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.budgetFileBudgetId && !param.contractBudgetId && !param.projectBudgetHisBudgetId && !param.projectBudgetBudgetId) {
      return {};
    }
    const include: any = [];
    param.budgetFileBudgetId &&
      param.budgetFileBudgetId.length > 0 &&
      include.push({ model: BudgetFileModel, as: 'budgetFileBudgetId' });
    param.contractBudgetId &&
      param.contractBudgetId.length > 0 &&
      include.push({ model: ContractModel, as: 'contractBudgetId' });
    param.projectBudgetHisBudgetId &&
      param.projectBudgetHisBudgetId.length > 0 &&
      include.push({ model: ProjectBudgetHisModel, as: 'projectBudgetHisBudgetId' });
    param.projectBudgetBudgetId &&
      param.projectBudgetBudgetId.length > 0 &&
      include.push({ model: ProjectBudgetModel, as: 'projectBudgetBudgetId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'budgetModel.createOptions',
    provider: createOptions,
  },
]);

