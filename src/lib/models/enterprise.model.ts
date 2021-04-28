import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { CapitalAccountModel } from './capital-account.model';
import { ContractSignModel } from './contract-sign.model';
import { DataDictionaryModel } from './data-dictionary.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 企业信息
 */
export type IEnterpriseModel = typeof EnterpriseModel;

/**
 * 企业信息
 */
@Table({
  tableName: 'enterprise',
  comment: '企业信息',
})
export class EnterpriseModel extends BaseModel {
  /**
   * 企业注册地址
   */
  @Column({ comment: '企业注册地址', type: DataType.STRING(1000) })
  address?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 联系人
   */
  @Column({ comment: '联系人', type: DataType.STRING(50) })
  contacts?: string;
  /**
   * 联系人电话
   */
  @Column({ comment: '联系人电话', type: DataType.STRING(50) })
  contactsPhone?: string;
  /**
   * 状态
   */
  @Column({ comment: '状态', type: DataType.STRING(50) })
  enterpriseStatus?: string;
  /**
   * 企业类型
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '企业类型', type: DataType.STRING(50) })
  enterpriseTypeId?: string;
  /**
   * 企业名称
   */
  @Column({ comment: '企业名称', type: DataType.STRING(1000) })
  name?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @HasMany(() => CapitalAccountModel, 'enterprise_id')
  capitalAccountEnterpriseId: Array<CapitalAccountModel>;

  @HasMany(() => ContractSignModel, 'enterprise_id')
  contractSignEnterpriseId: Array<ContractSignModel>;

  @BelongsTo(() => DataDictionaryModel, 'enterprise_type_id')
  enterpriseTypeIdObj: DataDictionaryModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class ENTERPRISE {

  /**
   * 企业注册地址
   */
  static readonly ADDRESS: string = 'address';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 联系人
   */
  static readonly CONTACTS: string = 'contacts';

  /**
   * 联系人电话
   */
  static readonly CONTACTS_PHONE: string = 'contactsPhone';

  /**
   * 状态
   */
  static readonly ENTERPRISE_STATUS: string = 'enterpriseStatus';

  /**
   * 企业类型
   */
  static readonly ENTERPRISE_TYPE_ID: string = 'enterpriseTypeId';

  /**
   * 企业名称
   */
  static readonly NAME: string = 'name';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => EnterpriseModel;
providerWrapper([
  {
    id: 'enterpriseModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: EnterpriseModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.capitalAccountEnterpriseId && !param.contractSignEnterpriseId) {
      return {};
    }
    const include: any = [];
    param.capitalAccountEnterpriseId &&
      param.capitalAccountEnterpriseId.length > 0 &&
      include.push({ model: CapitalAccountModel, as: 'capitalAccountEnterpriseId' });
    param.contractSignEnterpriseId &&
      param.contractSignEnterpriseId.length > 0 &&
      include.push({ model: ContractSignModel, as: 'contractSignEnterpriseId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'enterpriseModel.createOptions',
    provider: createOptions,
  },
]);

