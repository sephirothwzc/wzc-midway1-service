import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';

// #region enum
export enum EVBudgetProjectProjectCode {
  /**
   *
   */
  unique = 'unique',
}

// #endregion

// 依赖注入 导出类型
/**
 * VIEW
 */
export type IVBudgetModel = typeof VBudgetModel;

/**
 * VIEW
 */
@Table({
  tableName: 'v_budget',
  comment: 'VIEW',
})
export class VBudgetModel extends BaseModel {
  /**
   * 项目录入人
   */
  @Column({ comment: '项目录入人', type: DataType.STRING(50) })
  projectAddUserId?: string;
  /**
   * 审定金额
   */
  @Column({ comment: '审定金额', type: DataType.INTEGER })
  projectApprovedAmount?: number;
  /**
   * 建设性质
   */
  @Column({ comment: '建设性质', type: DataType.STRING(50) })
  projectBuildNatureId?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  projectBusinessCode: string;
  /**
   * 创建时间
   */
  @Column({ comment: '创建时间', type: DataType.DATE })
  projectCreatedAt: Date;
  /**
   * 创建人id
   */
  @Column({ comment: '创建人id', type: DataType.STRING(50) })
  projectCreatedId: string;
  /**
   * 删除时间
   */
  @Column({ comment: '删除时间', type: DataType.DATE })
  projectDeletedAt?: Date;
  /**
   * 删除人id
   */
  @Column({ comment: '删除人id', type: DataType.STRING(50) })
  projectDeletedId: string;
  /**
   * 折子工程内容描述
   */
  @Column({ comment: '折子工程内容描述', type: DataType.STRING(500) })
  projectEclecticContentDescribe?: string;
  /**
   * 是否为折子工程
   */
  @Column({ comment: '是否为折子工程', type: DataType.INTEGER })
  projectEclecticProject?: number;
  /**
   * 项目终止时间
   */
  @Column({ comment: '项目终止时间', type: DataType.DATE })
  projectEndDate?: Date;
  /**
   * 是否政府采购
   */
  @Column({ comment: '是否政府采购', type: DataType.INTEGER })
  projectGovernmentPurchase?: number;
  /**
   * 是否市级以上投资工程
   */
  @Column({ comment: '是否市级以上投资工程', type: DataType.INTEGER })
  projectHasMunicipalLevel?: number;
  /**
   * 是否经过投资评审
   */
  @Column({ comment: '是否经过投资评审', type: DataType.INTEGER })
  projectHasReview?: number;
  /**
   * project_id
   */
  @Column({ comment: '', type: DataType.STRING(50) })
  projectId: string;
  /**
   * 是否纳入绩效
   */
  @Column({ comment: '是否纳入绩效', type: DataType.INTEGER })
  projectIncorporatePerformance?: number;
  /**
   * 投资金额
   */
  @Column({ comment: '投资金额', type: DataType.INTEGER })
  projectInvestmentAmount?: number;
  /**
   * 投资年度
   */
  @Column({ comment: '投资年度', type: DataType.INTEGER })
  projectInvestmentYear?: number;
  /**
   * 市级以上投资工程内容描述
   */
  @Column({ comment: '市级以上投资工程内容描述', type: DataType.STRING(500) })
  projectMunicipalLevelContentDescribe?: string;
  /**
   * 项目名称
   */
  @Column({ comment: '项目名称', type: DataType.STRING(50) })
  projectName?: string;
  /**
   * 是否常年项目
   */
  @Column({ comment: '是否常年项目', type: DataType.INTEGER })
  projectPerennial?: number;
  /**
   * 是否实施项目事前评估
   */
  @Column({ comment: '是否实施项目事前评估', type: DataType.INTEGER })
  projectPreEvaluation?: number;
  /**
   * 项目编号[unique]
   */
  @Column({ comment: '项目编号[unique]', type: DataType.STRING(50) })
  projectProjectCode?: EVBudgetProjectProjectCode;
  /**
   * 项目组id
   */
  @Column({ comment: '项目组id', type: DataType.STRING(50) })
  projectProjectGroupId?: string;
  /**
   * 项目状态
   */
  @Column({ comment: '项目状态', type: DataType.STRING(50) })
  projectProjectStatusId?: string;
  /**
   * 功能科目
   */
  @Column({ comment: '功能科目', type: DataType.STRING(50) })
  projectProjectSubjectId?: string;
  /**
   * 项目类型
   */
  @Column({ comment: '项目类型', type: DataType.STRING(50) })
  projectProjectTypeId?: string;
  /**
   * 是否公共项目
   */
  @Column({ comment: '是否公共项目', type: DataType.INTEGER })
  projectPublicProjects?: number;
  /**
   * 是否购买服务
   */
  @Column({ comment: '是否购买服务', type: DataType.INTEGER })
  projectPurchaseService?: number;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  projectRemark: string;
  /**
   * 责任科室
   */
  @Column({ comment: '责任科室', type: DataType.STRING(50) })
  projectResponsibleOrganizationId?: string;
  /**
   * 来源文号
   */
  @Column({ comment: '来源文号', type: DataType.STRING(50) })
  projectSourceFile?: string;
  /**
   * 项目起始时间
   */
  @Column({ comment: '项目起始时间', type: DataType.DATE })
  projectStartDate?: Date;
  /**
   * 项目状态
   */
  @Column({ comment: '项目状态', type: DataType.STRING(50) })
  projectStatus?: string;
  /**
   * 项目简介
   */
  @Column({ comment: '项目简介', type: DataType.STRING(200) })
  projectSynopsis?: string;
  /**
   * 修改时间
   */
  @Column({ comment: '修改时间', type: DataType.DATE })
  projectUpdatedAt: Date;
  /**
   * 修改人id
   */
  @Column({ comment: '修改人id', type: DataType.STRING(50) })
  projectUpdatedId: string;
  /**
   * 版本
   */
  @Column({ comment: '版本', type: DataType.INTEGER })
  projectVersion?: number;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class V_BUDGET {
  /**
   * 项目录入人
   */
  static readonly PROJECT_ADD_USER_ID: string = 'projectAddUserId';

  /**
   * 审定金额
   */
  static readonly PROJECT_APPROVED_AMOUNT: string = 'projectApprovedAmount';

  /**
   * 建设性质
   */
  static readonly PROJECT_BUILD_NATURE_ID: string = 'projectBuildNatureId';

  /**
   * 业务编码权限用
   */
  static readonly PROJECT_BUSINESS_CODE: string = 'projectBusinessCode';

  /**
   * 创建时间
   */
  static readonly PROJECT_CREATED_AT: string = 'projectCreatedAt';

  /**
   * 创建人id
   */
  static readonly PROJECT_CREATED_ID: string = 'projectCreatedId';

  /**
   * 删除时间
   */
  static readonly PROJECT_DELETED_AT: string = 'projectDeletedAt';

  /**
   * 删除人id
   */
  static readonly PROJECT_DELETED_ID: string = 'projectDeletedId';

  /**
   * 折子工程内容描述
   */
  static readonly PROJECT_ECLECTIC_CONTENT_DESCRIBE: string =
    'projectEclecticContentDescribe';

  /**
   * 是否为折子工程
   */
  static readonly PROJECT_ECLECTIC_PROJECT: string = 'projectEclecticProject';

  /**
   * 项目终止时间
   */
  static readonly PROJECT_END_DATE: string = 'projectEndDate';

  /**
   * 是否政府采购
   */
  static readonly PROJECT_GOVERNMENT_PURCHASE: string =
    'projectGovernmentPurchase';

  /**
   * 是否市级以上投资工程
   */
  static readonly PROJECT_HAS_MUNICIPAL_LEVEL: string =
    'projectHasMunicipalLevel';

  /**
   * 是否经过投资评审
   */
  static readonly PROJECT_HAS_REVIEW: string = 'projectHasReview';

  /**
   *
   */
  static readonly PROJECT_ID: string = 'projectId';

  /**
   * 是否纳入绩效
   */
  static readonly PROJECT_INCORPORATE_PERFORMANCE: string =
    'projectIncorporatePerformance';

  /**
   * 投资金额
   */
  static readonly PROJECT_INVESTMENT_AMOUNT: string = 'projectInvestmentAmount';

  /**
   * 投资年度
   */
  static readonly PROJECT_INVESTMENT_YEAR: string = 'projectInvestmentYear';

  /**
   * 市级以上投资工程内容描述
   */
  static readonly PROJECT_MUNICIPAL_LEVEL_CONTENT_DESCRIBE: string =
    'projectMunicipalLevelContentDescribe';

  /**
   * 项目名称
   */
  static readonly PROJECT_NAME: string = 'projectName';

  /**
   * 是否常年项目
   */
  static readonly PROJECT_PERENNIAL: string = 'projectPerennial';

  /**
   * 是否实施项目事前评估
   */
  static readonly PROJECT_PRE_EVALUATION: string = 'projectPreEvaluation';

  /**
   * 项目编号[unique]
   */
  static readonly PROJECT_PROJECT_CODE: string = 'projectProjectCode';

  /**
   * 项目组id
   */
  static readonly PROJECT_PROJECT_GROUP_ID: string = 'projectProjectGroupId';

  /**
   * 项目状态
   */
  static readonly PROJECT_PROJECT_STATUS_ID: string = 'projectProjectStatusId';

  /**
   * 功能科目
   */
  static readonly PROJECT_PROJECT_SUBJECT_ID: string =
    'projectProjectSubjectId';

  /**
   * 项目类型
   */
  static readonly PROJECT_PROJECT_TYPE_ID: string = 'projectProjectTypeId';

  /**
   * 是否公共项目
   */
  static readonly PROJECT_PUBLIC_PROJECTS: string = 'projectPublicProjects';

  /**
   * 是否购买服务
   */
  static readonly PROJECT_PURCHASE_SERVICE: string = 'projectPurchaseService';

  /**
   * 备注
   */
  static readonly PROJECT_REMARK: string = 'projectRemark';

  /**
   * 责任科室
   */
  static readonly PROJECT_RESPONSIBLE_ORGANIZATION_ID: string =
    'projectResponsibleOrganizationId';

  /**
   * 来源文号
   */
  static readonly PROJECT_SOURCE_FILE: string = 'projectSourceFile';

  /**
   * 项目起始时间
   */
  static readonly PROJECT_START_DATE: string = 'projectStartDate';

  /**
   * 项目状态
   */
  static readonly PROJECT_STATUS: string = 'projectStatus';

  /**
   * 项目简介
   */
  static readonly PROJECT_SYNOPSIS: string = 'projectSynopsis';

  /**
   * 修改时间
   */
  static readonly PROJECT_UPDATED_AT: string = 'projectUpdatedAt';

  /**
   * 修改人id
   */
  static readonly PROJECT_UPDATED_ID: string = 'projectUpdatedId';

  /**
   * 版本
   */
  static readonly PROJECT_VERSION: string = 'projectVersion';
}

// @provide 用 工厂模式static model
export const factory = () => VBudgetModel;
providerWrapper([
  {
    id: 'vBudgetModel',
    provider: factory,
  },
]);
