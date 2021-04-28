import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ProjectBudgetHisModel } from './project-budget-his.model';
import { ProjectFileHisModel } from './project-file-his.model';
import { ProjectModel } from './project.model';
import { ProjectGroupModel } from './project-group.model';
import { DataDictionaryModel } from './data-dictionary.model';
import { OrganizationModel } from './organization.model';
import { AppUserModel } from './app-user.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 项目
 */
export type IProjectHisModel = typeof ProjectHisModel;

/**
 * 项目
 */
@Table({
  tableName: 'project_his',
  comment: '项目',
})
export class ProjectHisModel extends BaseModel {
  /**
   * 项目录入人
   */
  @ForeignKey(() => AppUserModel)
  @Column({ comment: '项目录入人', type: DataType.STRING(50) })
  addUserId?: string;
  /**
   * 审定金额
   */
  @Column({ comment: '审定金额', type: DataType.INTEGER })
  approvedAmount?: number;
  /**
   * 建设性质
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '建设性质', type: DataType.STRING(50) })
  buildNatureId?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 折子工程内容描述
   */
  @Column({ comment: '折子工程内容描述', type: DataType.STRING(500) })
  eclecticContentDescribe?: string;
  /**
   * 是否为折子工程
   */
  @Column({ comment: '是否为折子工程', type: DataType.INTEGER })
  eclecticProject?: number;
  /**
   * 是否政府采购
   */
  @Column({ comment: '是否政府采购', type: DataType.INTEGER })
  governmentPurchase?: number;
  /**
   * 是否市级以上投资工程
   */
  @Column({ comment: '是否市级以上投资工程', type: DataType.INTEGER })
  hasMunicipalLevel?: number;
  /**
   * 是否经过投资评审
   */
  @Column({ comment: '是否经过投资评审', type: DataType.INTEGER })
  hasReview?: number;
  /**
   * 是否纳入绩效
   */
  @Column({ comment: '是否纳入绩效', type: DataType.INTEGER })
  incorporatePerformance?: number;
  /**
   * 投资年度
   */
  @Column({ comment: '投资年度', type: DataType.INTEGER })
  investmentYear?: number;
  /**
   * 市级以上投资工程内容描述
   */
  @Column({ comment: '市级以上投资工程内容描述', type: DataType.STRING(500) })
  municipalLevelContentDescribe?: string;
  /**
   * 项目名称
   */
  @Column({ comment: '项目名称', type: DataType.STRING(50) })
  name?: string;
  /**
   * 是否常年项目
   */
  @Column({ comment: '是否常年项目', type: DataType.INTEGER })
  perennial?: number;
  /**
   * 是否实施项目事前评估
   */
  @Column({ comment: '是否实施项目事前评估', type: DataType.INTEGER })
  preEvaluation?: number;
  /**
   * 项目编号
   */
  @Column({ comment: '项目编号', type: DataType.STRING(50) })
  projectCode?: string;
  /**
   * 项目组id
   */
  @ForeignKey(() => ProjectGroupModel)
  @Column({ comment: '项目组id', type: DataType.STRING(50) })
  projectGroupId?: string;
  /**
   * 项目组id
   */
  @ForeignKey(() => ProjectModel)
  @Column({ comment: '项目组id', type: DataType.STRING(50) })
  projectId?: string;
  /**
   * 项目科目
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '项目科目', type: DataType.STRING(50) })
  projectStatusId?: string;
  /**
   * 项目科目
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '项目科目', type: DataType.STRING(50) })
  projectSubjectId?: string;
  /**
   * 项目类型
   */
  @ForeignKey(() => DataDictionaryModel)
  @Column({ comment: '项目类型', type: DataType.STRING(50) })
  projectTypeId?: string;
  /**
   * 是否公共项目
   */
  @Column({ comment: '是否公共项目', type: DataType.INTEGER })
  publicProjects?: number;
  /**
   * 是否购买服务
   */
  @Column({ comment: '是否购买服务', type: DataType.INTEGER })
  purchaseService?: number;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 责任科室
   */
  @ForeignKey(() => OrganizationModel)
  @Column({ comment: '责任科室', type: DataType.STRING(50) })
  responsibleOrganizationId?: string;
  /**
   * 来源文件号
   */
  @Column({ comment: '来源文件号', type: DataType.STRING(50) })
  sourceFile?: string;
  /**
   * 项目组简介
   */
  @Column({ comment: '项目组简介', type: DataType.STRING(200) })
  synopsis?: string;
  /**
   * 版本
   */
  @Column({ comment: '版本', type: DataType.INTEGER })
  version?: number;

  @HasMany(() => ProjectBudgetHisModel, 'project_his_id')
  projectBudgetHisProjectHisId: Array<ProjectBudgetHisModel>;

  @HasMany(() => ProjectFileHisModel, 'project_his_id')
  projectFileHisProjectHisId: Array<ProjectFileHisModel>;

  @BelongsTo(() => ProjectModel, 'project_id')
  projectIdObj: ProjectModel;

  @BelongsTo(() => ProjectGroupModel, 'project_group_id')
  projectGroupIdObj: ProjectGroupModel;

  @BelongsTo(() => DataDictionaryModel, 'project_type_id')
  projectTypeIdObj: DataDictionaryModel;

  @BelongsTo(() => DataDictionaryModel, 'project_subject_id')
  projectSubjectIdObj: DataDictionaryModel;

  @BelongsTo(() => OrganizationModel, 'responsible_organization_id')
  responsibleOrganizationIdObj: OrganizationModel;

  @BelongsTo(() => DataDictionaryModel, 'project_status_id')
  projectStatusIdObj: DataDictionaryModel;

  @BelongsTo(() => DataDictionaryModel, 'build_nature_id')
  buildNatureIdObj: DataDictionaryModel;

  @BelongsTo(() => AppUserModel, 'add_user_id')
  addUserIdObj: AppUserModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class PROJECT_HIS {

  /**
   * 项目录入人
   */
  static readonly ADD_USER_ID: string = 'addUserId';

  /**
   * 审定金额
   */
  static readonly APPROVED_AMOUNT: string = 'approvedAmount';

  /**
   * 建设性质
   */
  static readonly BUILD_NATURE_ID: string = 'buildNatureId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 折子工程内容描述
   */
  static readonly ECLECTIC_CONTENT_DESCRIBE: string = 'eclecticContentDescribe';

  /**
   * 是否为折子工程
   */
  static readonly ECLECTIC_PROJECT: string = 'eclecticProject';

  /**
   * 是否政府采购
   */
  static readonly GOVERNMENT_PURCHASE: string = 'governmentPurchase';

  /**
   * 是否市级以上投资工程
   */
  static readonly HAS_MUNICIPAL_LEVEL: string = 'hasMunicipalLevel';

  /**
   * 是否经过投资评审
   */
  static readonly HAS_REVIEW: string = 'hasReview';

  /**
   * 是否纳入绩效
   */
  static readonly INCORPORATE_PERFORMANCE: string = 'incorporatePerformance';

  /**
   * 投资年度
   */
  static readonly INVESTMENT_YEAR: string = 'investmentYear';

  /**
   * 市级以上投资工程内容描述
   */
  static readonly MUNICIPAL_LEVEL_CONTENT_DESCRIBE: string = 'municipalLevelContentDescribe';

  /**
   * 项目名称
   */
  static readonly NAME: string = 'name';

  /**
   * 是否常年项目
   */
  static readonly PERENNIAL: string = 'perennial';

  /**
   * 是否实施项目事前评估
   */
  static readonly PRE_EVALUATION: string = 'preEvaluation';

  /**
   * 项目编号
   */
  static readonly PROJECT_CODE: string = 'projectCode';

  /**
   * 项目组id
   */
  static readonly PROJECT_GROUP_ID: string = 'projectGroupId';

  /**
   * 项目组id
   */
  static readonly PROJECT_ID: string = 'projectId';

  /**
   * 项目科目
   */
  static readonly PROJECT_STATUS_ID: string = 'projectStatusId';

  /**
   * 项目科目
   */
  static readonly PROJECT_SUBJECT_ID: string = 'projectSubjectId';

  /**
   * 项目类型
   */
  static readonly PROJECT_TYPE_ID: string = 'projectTypeId';

  /**
   * 是否公共项目
   */
  static readonly PUBLIC_PROJECTS: string = 'publicProjects';

  /**
   * 是否购买服务
   */
  static readonly PURCHASE_SERVICE: string = 'purchaseService';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 责任科室
   */
  static readonly RESPONSIBLE_ORGANIZATION_ID: string = 'responsibleOrganizationId';

  /**
   * 来源文件号
   */
  static readonly SOURCE_FILE: string = 'sourceFile';

  /**
   * 项目组简介
   */
  static readonly SYNOPSIS: string = 'synopsis';

  /**
   * 版本
   */
  static readonly VERSION: string = 'version';

}

// @provide 用 工厂模式static model
export const factory = () => ProjectHisModel;
providerWrapper([
  {
    id: 'projectHisModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ProjectHisModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.projectBudgetHisProjectHisId && !param.projectFileHisProjectHisId) {
      return {};
    }
    const include: any = [];
    param.projectBudgetHisProjectHisId &&
      param.projectBudgetHisProjectHisId.length > 0 &&
      include.push({ model: ProjectBudgetHisModel, as: 'projectBudgetHisProjectHisId' });
    param.projectFileHisProjectHisId &&
      param.projectFileHisProjectHisId.length > 0 &&
      include.push({ model: ProjectFileHisModel, as: 'projectFileHisProjectHisId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'projectHisModel.createOptions',
    provider: createOptions,
  },
]);

