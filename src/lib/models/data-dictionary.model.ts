import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractCollectionPaymentModel } from './contract-collection-payment.model';
import { ContractCollectionPaymentPlanModel } from './contract-collection-payment-plan.model';
import { ContractModel } from './contract.model';
import { EnterpriseModel } from './enterprise.model';
import { ProjectHisModel } from './project-his.model';
import { ProjectModel } from './project.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 数据字典
 */
export type IDataDictionaryModel = typeof DataDictionaryModel;

/**
 * 数据字典
 */
@Table({
  tableName: 'data_dictionary',
  comment: '数据字典',
})
export class DataDictionaryModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 说明文本
   */
  @Column({ comment: '说明文本', type: DataType.STRING(50) })
  description?: string;
  /**
   * 显示编码
   */
  @Column({ comment: '显示编码', type: DataType.STRING(50) })
  displayCode: string;
  /**
   * 显示值
   */
  @Column({ comment: '显示值', type: DataType.STRING(50) })
  displayTxt: string;
  /**
   * 英文数字组成禁止标点符号
   */
  @Column({ comment: '英文数字组成禁止标点符号', type: DataType.STRING(50) })
  key: string;
  /**
   * 父级地址id
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '父级地址id', type: DataType.STRING(50) })
  parentId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * Y启用N停用
   */
  @Column({ comment: 'Y启用N停用', type: DataType.STRING(50) })
  status: string;
  /**
   * 字典值
   */
  @Column({ comment: '字典值', type: DataType.STRING(50) })
  value: string;

  @HasMany(() => ContractCollectionPaymentModel, 'mode')
  contractCollectionPaymentMode: Array<ContractCollectionPaymentModel>;

  @HasMany(() => ContractCollectionPaymentModel, 'type')
  contractCollectionPaymentType: Array<ContractCollectionPaymentModel>;

  @HasMany(() => ContractCollectionPaymentPlanModel, 'mode')
  contractCollectionPaymentPlanMode: Array<ContractCollectionPaymentPlanModel>;

  @HasMany(() => ContractCollectionPaymentPlanModel, 'type')
  contractCollectionPaymentPlanType: Array<ContractCollectionPaymentPlanModel>;

  @HasMany(() => ContractModel, 'contract_type_id')
  contractContractTypeId: Array<ContractModel>;

  @HasMany(() => ContractModel, 'contract_status_id')
  contractContractStatusId: Array<ContractModel>;

  @HasMany(() => ContractModel, 'contract_nature_id')
  contractContractNatureId: Array<ContractModel>;

  @BelongsTo(() => DataDictionaryModel, 'parent_id')
  parentIdObj: DataDictionaryModel;

  @HasMany(() => DataDictionaryModel, 'parent_id')
  dataDictionaryParentId: Array<DataDictionaryModel>;

  @HasMany(() => EnterpriseModel, 'enterprise_type_id')
  enterpriseEnterpriseTypeId: Array<EnterpriseModel>;

  @HasMany(() => ProjectHisModel, 'project_type_id')
  projectHisProjectTypeId: Array<ProjectHisModel>;

  @HasMany(() => ProjectHisModel, 'project_subject_id')
  projectHisProjectSubjectId: Array<ProjectHisModel>;

  @HasMany(() => ProjectHisModel, 'project_status_id')
  projectHisProjectStatusId: Array<ProjectHisModel>;

  @HasMany(() => ProjectHisModel, 'build_nature_id')
  projectHisBuildNatureId: Array<ProjectHisModel>;

  @HasMany(() => ProjectModel, 'project_type_id')
  projectProjectTypeId: Array<ProjectModel>;

  @HasMany(() => ProjectModel, 'project_subject_id')
  projectProjectSubjectId: Array<ProjectModel>;

  @HasMany(() => ProjectModel, 'project_status_id')
  projectProjectStatusId: Array<ProjectModel>;

  @HasMany(() => ProjectModel, 'build_nature_id')
  projectBuildNatureId: Array<ProjectModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class DATA_DICTIONARY {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 说明文本
   */
  static readonly DESCRIPTION: string = 'description';

  /**
   * 显示编码
   */
  static readonly DISPLAY_CODE: string = 'displayCode';

  /**
   * 显示值
   */
  static readonly DISPLAY_TXT: string = 'displayTxt';

  /**
   * 英文数字组成禁止标点符号
   */
  static readonly KEY: string = 'key';

  /**
   * 父级地址id
   */
  static readonly PARENT_ID: string = 'parentId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * Y启用N停用
   */
  static readonly STATUS: string = 'status';

  /**
   * 字典值
   */
  static readonly VALUE: string = 'value';

}

// @provide 用 工厂模式static model
export const factory = () => DataDictionaryModel;
providerWrapper([
  {
    id: 'dataDictionaryModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: DataDictionaryModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.contractCollectionPaymentMode && !param.contractCollectionPaymentType && !param.contractCollectionPaymentPlanMode && !param.contractCollectionPaymentPlanType && !param.contractContractTypeId && !param.contractContractStatusId && !param.contractContractNatureId && !param.dataDictionaryParentId && !param.enterpriseEnterpriseTypeId && !param.projectHisProjectTypeId && !param.projectHisProjectSubjectId && !param.projectHisProjectStatusId && !param.projectHisBuildNatureId && !param.projectProjectTypeId && !param.projectProjectSubjectId && !param.projectProjectStatusId && !param.projectBuildNatureId) {
      return {};
    }
    const include: any = [];
    param.contractCollectionPaymentMode &&
      param.contractCollectionPaymentMode.length > 0 &&
      include.push({ model: ContractCollectionPaymentModel, as: 'contractCollectionPaymentMode' });
    param.contractCollectionPaymentType &&
      param.contractCollectionPaymentType.length > 0 &&
      include.push({ model: ContractCollectionPaymentModel, as: 'contractCollectionPaymentType' });
    param.contractCollectionPaymentPlanMode &&
      param.contractCollectionPaymentPlanMode.length > 0 &&
      include.push({ model: ContractCollectionPaymentPlanModel, as: 'contractCollectionPaymentPlanMode' });
    param.contractCollectionPaymentPlanType &&
      param.contractCollectionPaymentPlanType.length > 0 &&
      include.push({ model: ContractCollectionPaymentPlanModel, as: 'contractCollectionPaymentPlanType' });
    param.contractContractTypeId &&
      param.contractContractTypeId.length > 0 &&
      include.push({ model: ContractModel, as: 'contractContractTypeId' });
    param.contractContractStatusId &&
      param.contractContractStatusId.length > 0 &&
      include.push({ model: ContractModel, as: 'contractContractStatusId' });
    param.contractContractNatureId &&
      param.contractContractNatureId.length > 0 &&
      include.push({ model: ContractModel, as: 'contractContractNatureId' });
    param.dataDictionaryParentId &&
      param.dataDictionaryParentId.length > 0 &&
      include.push({ model: DataDictionaryModel, as: 'dataDictionaryParentId' });
    param.enterpriseEnterpriseTypeId &&
      param.enterpriseEnterpriseTypeId.length > 0 &&
      include.push({ model: EnterpriseModel, as: 'enterpriseEnterpriseTypeId' });
    param.projectHisProjectTypeId &&
      param.projectHisProjectTypeId.length > 0 &&
      include.push({ model: ProjectHisModel, as: 'projectHisProjectTypeId' });
    param.projectHisProjectSubjectId &&
      param.projectHisProjectSubjectId.length > 0 &&
      include.push({ model: ProjectHisModel, as: 'projectHisProjectSubjectId' });
    param.projectHisProjectStatusId &&
      param.projectHisProjectStatusId.length > 0 &&
      include.push({ model: ProjectHisModel, as: 'projectHisProjectStatusId' });
    param.projectHisBuildNatureId &&
      param.projectHisBuildNatureId.length > 0 &&
      include.push({ model: ProjectHisModel, as: 'projectHisBuildNatureId' });
    param.projectProjectTypeId &&
      param.projectProjectTypeId.length > 0 &&
      include.push({ model: ProjectModel, as: 'projectProjectTypeId' });
    param.projectProjectSubjectId &&
      param.projectProjectSubjectId.length > 0 &&
      include.push({ model: ProjectModel, as: 'projectProjectSubjectId' });
    param.projectProjectStatusId &&
      param.projectProjectStatusId.length > 0 &&
      include.push({ model: ProjectModel, as: 'projectProjectStatusId' });
    param.projectBuildNatureId &&
      param.projectBuildNatureId.length > 0 &&
      include.push({ model: ProjectModel, as: 'projectBuildNatureId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'dataDictionaryModel.createOptions',
    provider: createOptions,
  },
]);

