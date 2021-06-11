import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractCollectionPaymentModel } from './contract-collection-payment.model';
import { ContractCollectionPaymentPlanModel } from './contract-collection-payment-plan.model';
import { ProjectModel } from './project.model';
import { BudgetModel } from './budget.model';
import { DataDictionaryModel } from './data-dictionary.model';
import { AppUserModel } from './app-user.model';
import { OrganizationModel } from './organization.model';
import { ContractSignModel } from './contract-sign.model';
// #region enum
export enum EContractContractCode {
  /**
   *
   */
  unique = 'unique',

}

export enum EContractContractName {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * 合同
 */
export type IContractModel = typeof ContractModel;

/**
 * 合同
 */
@Table({
  tableName: 'contract',
  comment: '合同',
})
export class ContractModel extends BaseModel {
  /**
   * 录入人
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '录入人', type: DataType.STRING(50) })
  addUserId?: string;
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
   * 合同编号[unique]
   */
  @Column({ comment: '合同编号[unique]', type: DataType.STRING(50) })
  contractCode?: EContractContractCode;
  /**
   * 合同名称[unique]
   */
  @Column({ comment: '合同名称[unique]', type: DataType.STRING(50) })
  contractName?: EContractContractName;
  /**
   * 合同性质
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '合同性质', type: DataType.STRING(50) })
  contractNatureId?: string;
  /**
   * 签订期限止
   */
  @Column({ comment: '签订期限止', type: DataType.DATE })
  contractPeriodEnd?: Date;
  /**
   * 签订期限起
   */
  @Column({ comment: '签订期限起', type: DataType.DATE })
  contractPeriodStart?: Date;
  /**
   * 合同备注
   */
  @Column({ comment: '合同备注', type: DataType.STRING(1000) })
  contractRemark?: string;
  /**
   * 合同状态
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '合同状态', type: DataType.STRING(50) })
  contractStatusId?: string;
  /**
   * 合同类型
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '合同类型', type: DataType.STRING(50) })
  contractTypeId?: string;
  /**
   * 合同归属部门
   */
  @ForeignKey(() => OrganizationModel)
  @Column({ comment: '合同归属部门', type: DataType.STRING(50) })
  organizationId?: string;
  /**
   * 项目编号
   */
  @Column({ comment: '项目编号', type: DataType.STRING(50) })
  projectCode?: string;
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
  /**
   * 签订金额
   */
  @Column({ comment: '签订金额', type: DataType.INTEGER })
  signingAmount?: number;
  /**
   * 签订日期
   */
  @Column({ comment: '签订日期', type: DataType.DATE })
  signingDate?: Date;
  /**
   * 预算来源文件号
   */
  @Column({ comment: '预算来源文件号', type: DataType.STRING(50) })
  sourceNumber?: string;
  /**
   * 合同状态
   */
  @Column({ comment: '合同状态', type: DataType.STRING(50) })
  status?: string;

  @HasMany(() => ContractCollectionPaymentModel, 'contract_id')
  contractCollectionPaymentContractId: Array<ContractCollectionPaymentModel>;

  @HasMany(() => ContractCollectionPaymentPlanModel, 'contract_id')
  contractCollectionPaymentPlanContractId: Array<ContractCollectionPaymentPlanModel>;

  @BelongsTo(() => ProjectModel, 'project_id')
  projectIdObj: ProjectModel;

  @BelongsTo(() => BudgetModel, 'budget_id')
  budgetIdObj: BudgetModel;

  @BelongsTo(() => DataDictionaryModel, 'contract_type_id')
  contractTypeIdObj: DataDictionaryModel;

  @BelongsTo(() => DataDictionaryModel, 'contract_status_id')
  contractStatusIdObj: DataDictionaryModel;

  @BelongsTo(() => DataDictionaryModel, 'contract_nature_id')
  contractNatureIdObj: DataDictionaryModel;

  @BelongsTo(() => AppUserModel, 'add_user_id')
  addUserIdObj: AppUserModel;

  @BelongsTo(() => OrganizationModel, 'organization_id')
  organizationIdObj: OrganizationModel;

  @HasMany(() => ContractSignModel, 'contract_id')
  contractSignContractId: Array<ContractSignModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT {

  /**
   * 录入人
   */
  static readonly ADD_USER_ID: string = 'addUserId';

  /**
   * 预算id
   */
  static readonly BUDGET_ID: string = 'budgetId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 合同编号[unique]
   */
  static readonly CONTRACT_CODE: string = 'contractCode';

  /**
   * 合同名称[unique]
   */
  static readonly CONTRACT_NAME: string = 'contractName';

  /**
   * 合同性质
   */
  static readonly CONTRACT_NATURE_ID: string = 'contractNatureId';

  /**
   * 签订期限止
   */
  static readonly CONTRACT_PERIOD_END: string = 'contractPeriodEnd';

  /**
   * 签订期限起
   */
  static readonly CONTRACT_PERIOD_START: string = 'contractPeriodStart';

  /**
   * 合同备注
   */
  static readonly CONTRACT_REMARK: string = 'contractRemark';

  /**
   * 合同状态
   */
  static readonly CONTRACT_STATUS_ID: string = 'contractStatusId';

  /**
   * 合同类型
   */
  static readonly CONTRACT_TYPE_ID: string = 'contractTypeId';

  /**
   * 合同归属部门
   */
  static readonly ORGANIZATION_ID: string = 'organizationId';

  /**
   * 项目编号
   */
  static readonly PROJECT_CODE: string = 'projectCode';

  /**
   * 项目id
   */
  static readonly PROJECT_ID: string = 'projectId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 签订金额
   */
  static readonly SIGNING_AMOUNT: string = 'signingAmount';

  /**
   * 签订日期
   */
  static readonly SIGNING_DATE: string = 'signingDate';

  /**
   * 预算来源文件号
   */
  static readonly SOURCE_NUMBER: string = 'sourceNumber';

  /**
   * 合同状态
   */
  static readonly STATUS: string = 'status';

}

// @provide 用 工厂模式static model
export const factory = () => ContractModel;
providerWrapper([
  {
    id: 'contractModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ContractModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.contractCollectionPaymentContractId && !param.contractCollectionPaymentPlanContractId && !param.contractSignContractId) {
      return {};
    }
    const include: any = [];
    param.contractCollectionPaymentContractId &&
      param.contractCollectionPaymentContractId.length > 0 &&
      include.push({ model: ContractCollectionPaymentModel, as: 'contractCollectionPaymentContractId' });
    param.contractCollectionPaymentPlanContractId &&
      param.contractCollectionPaymentPlanContractId.length > 0 &&
      include.push({ model: ContractCollectionPaymentPlanModel, as: 'contractCollectionPaymentPlanContractId' });
    param.contractSignContractId &&
      param.contractSignContractId.length > 0 &&
      include.push({ model: ContractSignModel, as: 'contractSignContractId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'contractModel.createOptions',
    provider: createOptions,
  },
]);

