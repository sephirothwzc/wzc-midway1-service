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
import { ContractSignModel } from './contract-sign.model';
import { ContractModel } from './contract.model';
import { EnterpriseModel } from './enterprise.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 签约双方历史
 */
export type IContractSignHisModel = typeof ContractSignHisModel;

/**
 * 签约双方历史
 */
@Table({
  tableName: 'contract_sign_his',
  comment: '签约双方历史',
})
export class ContractSignHisModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
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
   * 合同签约id
   */
  @ForeignKey(() => ContractSignModel)
  @Column({ comment: '合同签约id', type: DataType.STRING(50) })
  contractSignId?: string;
  /**
   * 企业信息id
   */
  @ForeignKey(() => EnterpriseModel)
  @Column({ comment: '企业信息id', type: DataType.STRING(50) })
  enterpriseId?: string;
  /**
   * 签约类型甲方、乙方
   */
  @Column({ comment: '签约类型甲方、乙方', type: DataType.STRING(50) })
  enterpriseType?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @BelongsTo(() => ContractHisModel, 'contract_his_id')
  contractHisIdObj: ContractHisModel;

  @BelongsTo(() => ContractSignModel, 'contract_sign_id')
  contractSignIdObj: ContractSignModel;

  @BelongsTo(() => ContractModel, 'contract_id')
  contractIdObj: ContractModel;

  @BelongsTo(() => EnterpriseModel, 'enterprise_id')
  enterpriseIdObj: EnterpriseModel;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT_SIGN_HIS {
  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 合同历史id
   */
  static readonly CONTRACT_HIS_ID: string = 'contractHisId';

  /**
   * 合同id
   */
  static readonly CONTRACT_ID: string = 'contractId';

  /**
   * 合同签约id
   */
  static readonly CONTRACT_SIGN_ID: string = 'contractSignId';

  /**
   * 企业信息id
   */
  static readonly ENTERPRISE_ID: string = 'enterpriseId';

  /**
   * 签约类型甲方、乙方
   */
  static readonly ENTERPRISE_TYPE: string = 'enterpriseType';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';
}

// @provide 用 工厂模式static model
export const factory = () => ContractSignHisModel;
providerWrapper([
  {
    id: 'contractSignHisModel',
    provider: factory,
  },
]);
