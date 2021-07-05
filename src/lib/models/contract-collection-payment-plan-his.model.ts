import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractHisModel } from './contract-his.model';
import { ContractCollectionPaymentPlanModel } from './contract-collection-payment-plan.model';
import { ContractModel } from './contract.model';
import { DataDictionaryModel } from './data-dictionary.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 合同收款计划历史
 */
export type IContractCollectionPaymentPlanHisModel =
  typeof ContractCollectionPaymentPlanHisModel;

/**
 * 合同收款计划历史
 */
@Table({
  tableName: 'contract_collection_payment_plan_his',
  comment: '合同收款计划历史',
})
export class ContractCollectionPaymentPlanHisModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 收款金额
   */
  @Column({ comment: '收款金额', type: DataType.INTEGER })
  collectedAmount?: number;
  /**
   * 收款比例
   */
  @Column({ comment: '收款比例', type: DataType.INTEGER })
  collectedProportion?: number;
  /**
   * 预算来源文件号
   */
  @Column({ comment: '预算来源文件号', type: DataType.STRING(500) })
  collectedRemark?: string;
  /**
   * 收款时间
   */
  @Column({ comment: '收款时间', type: DataType.DATE })
  collectedTime?: Date;
  /**
   * 合同收款计划id
   */
  @ForeignKey(() => ContractCollectionPaymentPlanModel)
  @Column({ comment: '合同收款计划id', type: DataType.STRING(50) })
  contractCollectionPaymentPlanId?: string;
  /**
   * 合同历史id
   */
  @ForeignKey(() => ContractHisModel)
  @Column({ comment: '合同历史id', type: DataType.STRING(50) })
  contractHisId?: string;
  /**
   * 合同id
   */
  @ForeignKey(() => ContractModel)
  @Column({ comment: '合同id', type: DataType.STRING(50) })
  contractId?: string;
  /**
   * 收款方式
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '收款方式', type: DataType.STRING(50) })
  mode?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 计划状态
   */
  @Column({ comment: '计划状态', type: DataType.STRING(50) })
  status?: string;
  /**
   * 收款类型
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '收款类型', type: DataType.STRING(50) })
  type?: string;

  @BelongsTo(() => ContractHisModel, 'contract_his_id')
  contractHisIdObj: ContractHisModel;

  @BelongsTo(
    () => ContractCollectionPaymentPlanModel,
    'contract_collection_payment_plan_id'
  )
  contractCollectionPaymentPlanIdObj: ContractCollectionPaymentPlanModel;

  @BelongsTo(() => ContractModel, 'contract_id')
  contractIdObj: ContractModel;

  @BelongsTo(() => DataDictionaryModel, 'mode')
  modeObj: DataDictionaryModel;

  @BelongsTo(() => DataDictionaryModel, 'type')
  typeObj: DataDictionaryModel;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT_COLLECTION_PAYMENT_PLAN_HIS {
  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 收款金额
   */
  static readonly COLLECTED_AMOUNT: string = 'collectedAmount';

  /**
   * 收款比例
   */
  static readonly COLLECTED_PROPORTION: string = 'collectedProportion';

  /**
   * 预算来源文件号
   */
  static readonly COLLECTED_REMARK: string = 'collectedRemark';

  /**
   * 收款时间
   */
  static readonly COLLECTED_TIME: string = 'collectedTime';

  /**
   * 合同收款计划id
   */
  static readonly CONTRACT_COLLECTION_PAYMENT_PLAN_ID: string =
    'contractCollectionPaymentPlanId';

  /**
   * 合同历史id
   */
  static readonly CONTRACT_HIS_ID: string = 'contractHisId';

  /**
   * 合同id
   */
  static readonly CONTRACT_ID: string = 'contractId';

  /**
   * 收款方式
   */
  static readonly MODE: string = 'mode';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 计划状态
   */
  static readonly STATUS: string = 'status';

  /**
   * 收款类型
   */
  static readonly TYPE: string = 'type';
}

// @provide 用 工厂模式static model
export const factory = () => ContractCollectionPaymentPlanHisModel;
providerWrapper([
  {
    id: 'contractCollectionPaymentPlanHisModel',
    provider: factory,
  },
]);
