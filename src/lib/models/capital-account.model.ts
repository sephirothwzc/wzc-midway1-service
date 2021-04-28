import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { EnterpriseModel } from './enterprise.model';
import { ContractCollectionPaymentModel } from './contract-collection-payment.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 资金账户
 */
export type ICapitalAccountModel = typeof CapitalAccountModel;

/**
 * 资金账户
 */
@Table({
  tableName: 'capital_account',
  comment: '资金账户',
})
export class CapitalAccountModel extends BaseModel {
  /**
   * 开户银行账号
   */
  @Column({ comment: '开户银行账号', type: DataType.STRING(50) })
  bankAccount?: string;
  /**
   * 开户银行
   */
  @Column({ comment: '开户银行', type: DataType.STRING(50) })
  bankDeposit?: string;
  /**
   * 开户银行行号
   */
  @Column({ comment: '开户银行行号', type: DataType.STRING(50) })
  bankNumber?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 账户编号
   */
  @Column({ comment: '账户编号', type: DataType.STRING(50) })
  code?: string;
  /**
   * 企业信息id
   */
  @ForeignKey(() => EnterpriseModel)
  @Column({ comment: '企业信息id', type: DataType.STRING(50) })
  enterpriseId?: string;
  /**
   * 是否企业
   */
  @Column({ comment: '是否企业', type: DataType.STRING(50) })
  hasEnterprise?: string;
  /**
   * 账户名称
   */
  @Column({ comment: '账户名称', type: DataType.STRING(50) })
  name?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 状态
   */
  @Column({ comment: '状态', type: DataType.STRING(50) })
  status?: string;

  @BelongsTo(() => EnterpriseModel, 'enterprise_id')
  enterpriseIdObj: EnterpriseModel;

  @HasMany(() => ContractCollectionPaymentModel, 'collection_account_id')
  contractCollectionPaymentCollectionAccountId: Array<ContractCollectionPaymentModel>;

  @HasMany(() => ContractCollectionPaymentModel, 'payment_account_id')
  contractCollectionPaymentPaymentAccountId: Array<ContractCollectionPaymentModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CAPITAL_ACCOUNT {

  /**
   * 开户银行账号
   */
  static readonly BANK_ACCOUNT: string = 'bankAccount';

  /**
   * 开户银行
   */
  static readonly BANK_DEPOSIT: string = 'bankDeposit';

  /**
   * 开户银行行号
   */
  static readonly BANK_NUMBER: string = 'bankNumber';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 账户编号
   */
  static readonly CODE: string = 'code';

  /**
   * 企业信息id
   */
  static readonly ENTERPRISE_ID: string = 'enterpriseId';

  /**
   * 是否企业
   */
  static readonly HAS_ENTERPRISE: string = 'hasEnterprise';

  /**
   * 账户名称
   */
  static readonly NAME: string = 'name';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 状态
   */
  static readonly STATUS: string = 'status';

}

// @provide 用 工厂模式static model
export const factory = () => CapitalAccountModel;
providerWrapper([
  {
    id: 'capitalAccountModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: CapitalAccountModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.contractCollectionPaymentCollectionAccountId && !param.contractCollectionPaymentPaymentAccountId) {
      return {};
    }
    const include: any = [];
    param.contractCollectionPaymentCollectionAccountId &&
      param.contractCollectionPaymentCollectionAccountId.length > 0 &&
      include.push({ model: ContractCollectionPaymentModel, as: 'contractCollectionPaymentCollectionAccountId' });
    param.contractCollectionPaymentPaymentAccountId &&
      param.contractCollectionPaymentPaymentAccountId.length > 0 &&
      include.push({ model: ContractCollectionPaymentModel, as: 'contractCollectionPaymentPaymentAccountId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'capitalAccountModel.createOptions',
    provider: createOptions,
  },
]);

