import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractCollectionPaymentModel } from './contract-collection-payment.model';
import { ContractModel } from './contract.model';
import { DataDictionaryModel } from './data-dictionary.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 合同收款计划
 */
export type IContractCollectionPaymentPlanModel = typeof ContractCollectionPaymentPlanModel;

/**
 * 合同收款计划
 */
@Table({
  tableName: 'contract_collection_payment_plan',
  comment: '合同收款计划',
})
export class ContractCollectionPaymentPlanModel extends BaseModel {
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
   * 收款备注
   */
  @Column({ comment: '收款备注', type: DataType.DATE })
  collectedRemark?: Date;
  /**
   * 收款时间
   */
  @Column({ comment: '收款时间', type: DataType.DATE })
  collectedTime?: Date;
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

  @HasMany(() => ContractCollectionPaymentModel, 'contract_collection_plan_id')
  contractCollectionPaymentContractCollectionPlanId: Array<ContractCollectionPaymentModel>;

  @BelongsTo(() => ContractModel, 'contract_id')
  contractIdObj: ContractModel;

  @BelongsTo(() => DataDictionaryModel, 'mode')
  modeObj: DataDictionaryModel;

  @BelongsTo(() => DataDictionaryModel, 'type')
  typeObj: DataDictionaryModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT_COLLECTION_PAYMENT_PLAN {

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
   * 收款备注
   */
  static readonly COLLECTED_REMARK: string = 'collectedRemark';

  /**
   * 收款时间
   */
  static readonly COLLECTED_TIME: string = 'collectedTime';

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
export const factory = () => ContractCollectionPaymentPlanModel;
providerWrapper([
  {
    id: 'contractCollectionPaymentPlanModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ContractCollectionPaymentPlanModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.contractCollectionPaymentContractCollectionPlanId) {
      return {};
    }
    const include: any = [];
    param.contractCollectionPaymentContractCollectionPlanId &&
      param.contractCollectionPaymentContractCollectionPlanId.length > 0 &&
      include.push({ model: ContractCollectionPaymentModel, as: 'contractCollectionPaymentContractCollectionPlanId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'contractCollectionPaymentPlanModel.createOptions',
    provider: createOptions,
  },
]);

