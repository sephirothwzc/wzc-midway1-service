import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractCollectionPaymentFileModel } from './contract-collection-payment-file.model';
import { ContractModel } from './contract.model';
import { ContractCollectionPaymentPlanModel } from './contract-collection-payment-plan.model';
import { CapitalAccountModel } from './capital-account.model';
import { DataDictionaryModel } from './data-dictionary.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 合同收款
 */
export type IContractCollectionPaymentModel = typeof ContractCollectionPaymentModel;

/**
 * 合同收款
 */
@Table({
  tableName: 'contract_collection_payment',
  comment: '合同收款',
})
export class ContractCollectionPaymentModel extends BaseModel {
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
  @Column({ comment: '收款备注', type: DataType.STRING(500) })
  collectedRemark?: string;
  /**
   * 收款时间
   */
  @Column({ comment: '收款时间', type: DataType.DATE })
  collectedTime?: Date;
  /**
   * 收款账号id
   */
  @ForeignKey(() => CapitalAccountModel)
  @Column({ comment: '收款账号id', type: DataType.STRING(50) })
  collectionAccountId?: string;
  /**
   * 合同收款计划id 可以为空
   */
  @ForeignKey(() => ContractCollectionPaymentPlanModel)
  @Column({ comment: '合同收款计划id 可以为空', type: DataType.STRING(50) })
  contractCollectionPlanId?: string;
  /**
   * 合同id
   */
  @ForeignKey(() => ContractModel)
  @Column({ comment: '合同id', type: DataType.STRING(50) })
  contractId?: string;
  /**
   * 付款人
   */
  @Column({ comment: '付款人', type: DataType.STRING(50) })
  drawee?: string;
  /**
   * 收款方式
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '收款方式', type: DataType.STRING(50) })
  mode?: string;
  /**
   * 操作人id
   */
  @Column({ comment: '操作人id', type: DataType.STRING(50) })
  optionsUserId?: string;
  /**
   * 收款人
   */
  @Column({ comment: '收款人', type: DataType.STRING(50) })
  payee?: string;
  /**
   * 付款账号id
   */
  @ForeignKey(() => CapitalAccountModel)
  @Column({ comment: '付款账号id', type: DataType.STRING(50) })
  paymentAccountId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 收款状态
   */
  @Column({ comment: '收款状态', type: DataType.STRING(50) })
  status?: string;
  /**
   * 收款类型
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '收款类型', type: DataType.STRING(50) })
  type?: string;

  @HasMany(() => ContractCollectionPaymentFileModel, 'contract_collection_payment_id')
  contractCollectionPaymentFileContractCollectionPaymentId: Array<ContractCollectionPaymentFileModel>;

  @BelongsTo(() => ContractModel, 'contract_id')
  contractIdObj: ContractModel;

  @BelongsTo(() => ContractCollectionPaymentPlanModel, 'contract_collection_plan_id')
  contractCollectionPlanIdObj: ContractCollectionPaymentPlanModel;

  @BelongsTo(() => CapitalAccountModel, 'collection_account_id')
  collectionAccountIdObj: CapitalAccountModel;

  @BelongsTo(() => CapitalAccountModel, 'payment_account_id')
  paymentAccountIdObj: CapitalAccountModel;

  @BelongsTo(() => DataDictionaryModel, 'mode')
  modeObj: DataDictionaryModel;

  @BelongsTo(() => DataDictionaryModel, 'type')
  typeObj: DataDictionaryModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT_COLLECTION_PAYMENT {

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
   * 收款账号id
   */
  static readonly COLLECTION_ACCOUNT_ID: string = 'collectionAccountId';

  /**
   * 合同收款计划id 可以为空
   */
  static readonly CONTRACT_COLLECTION_PLAN_ID: string = 'contractCollectionPlanId';

  /**
   * 合同id
   */
  static readonly CONTRACT_ID: string = 'contractId';

  /**
   * 付款人
   */
  static readonly DRAWEE: string = 'drawee';

  /**
   * 收款方式
   */
  static readonly MODE: string = 'mode';

  /**
   * 操作人id
   */
  static readonly OPTIONS_USER_ID: string = 'optionsUserId';

  /**
   * 收款人
   */
  static readonly PAYEE: string = 'payee';

  /**
   * 付款账号id
   */
  static readonly PAYMENT_ACCOUNT_ID: string = 'paymentAccountId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 收款状态
   */
  static readonly STATUS: string = 'status';

  /**
   * 收款类型
   */
  static readonly TYPE: string = 'type';

}

// @provide 用 工厂模式static model
export const factory = () => ContractCollectionPaymentModel;
providerWrapper([
  {
    id: 'contractCollectionPaymentModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ContractCollectionPaymentModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.contractCollectionPaymentFileContractCollectionPaymentId) {
      return {};
    }
    const include: any = [];
    param.contractCollectionPaymentFileContractCollectionPaymentId &&
      param.contractCollectionPaymentFileContractCollectionPaymentId.length > 0 &&
      include.push({ model: ContractCollectionPaymentFileModel, as: 'contractCollectionPaymentFileContractCollectionPaymentId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'contractCollectionPaymentModel.createOptions',
    provider: createOptions,
  },
]);

