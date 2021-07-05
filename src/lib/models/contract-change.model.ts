import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractChangeFileModel } from './contract-change-file.model';
import { ContractModel } from './contract.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 合同变更
 */
export type IContractChangeModel = typeof ContractChangeModel;

/**
 * 合同变更
 */
@Table({
  tableName: 'contract_change',
  comment: '合同变更',
})
export class ContractChangeModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 变更描述
   */
  @Column({ comment: '变更描述', type: DataType.STRING(500) })
  changeRemark?: string;
  /**
   * 变更类型
   */
  @Column({ comment: '变更类型', type: DataType.STRING(50) })
  changeType?: string;
  /**
   * 合同id
   */
  @ForeignKey(() => ContractModel)
  @Column({ comment: '合同id', type: DataType.STRING(50) })
  contractId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @HasMany(() => ContractChangeFileModel, 'contract_change_id')
  contractChangeFileContractChangeId: Array<ContractChangeFileModel>;

  @BelongsTo(() => ContractModel, 'contract_id')
  contractIdObj: ContractModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT_CHANGE {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 变更描述
   */
  static readonly CHANGE_REMARK: string = 'changeRemark';

  /**
   * 变更类型
   */
  static readonly CHANGE_TYPE: string = 'changeType';

  /**
   * 合同id
   */
  static readonly CONTRACT_ID: string = 'contractId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => ContractChangeModel;
providerWrapper([
  {
    id: 'contractChangeModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ContractChangeModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.contractChangeFileContractChangeId) {
      return {};
    }
    const include: any = [];
    param.contractChangeFileContractChangeId &&
      param.contractChangeFileContractChangeId.length > 0 &&
      include.push({ model: ContractChangeFileModel, as: 'contractChangeFileContractChangeId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'contractChangeModel.createOptions',
    provider: createOptions,
  },
]);

