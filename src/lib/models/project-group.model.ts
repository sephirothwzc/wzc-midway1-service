import { Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ProjectHisModel } from './project-his.model';
import { ProjectModel } from './project.model';
// #region enum
export enum EProjectGroupProjectGroupCode {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * 项目组
 */
export type IProjectGroupModel = typeof ProjectGroupModel;

/**
 * 项目组
 */
@Table({
  tableName: 'project_group',
  comment: '项目组',
})
export class ProjectGroupModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 项目终止时间
   */
  @Column({ comment: '项目终止时间', type: DataType.DATE })
  endDate?: Date;
  /**
   * 投资金额
   */
  @Column({ comment: '投资金额', type: DataType.INTEGER })
  investmentAmount?: number;
  /**
   * 投资年度
   */
  @Column({ comment: '投资年度', type: DataType.INTEGER })
  investmentYear?: number;
  /**
   * 项目组名称
   */
  @Column({ comment: '项目组名称', type: DataType.STRING(50) })
  name?: string;
  /**
   * 项目组编号[unique]
   */
  @Column({ comment: '项目组编号[unique]', type: DataType.STRING(50) })
  projectGroupCode?: EProjectGroupProjectGroupCode;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 项目起始时间
   */
  @Column({ comment: '项目起始时间', type: DataType.DATE })
  startDate?: Date;
  /**
   * 项目组简介
   */
  @Column({ comment: '项目组简介', type: DataType.STRING(200) })
  synopsis?: string;

  @HasMany(() => ProjectHisModel, 'project_group_id')
  projectHisProjectGroupId: Array<ProjectHisModel>;

  @HasMany(() => ProjectModel, 'project_group_id')
  projectProjectGroupId: Array<ProjectModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class PROJECT_GROUP {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 项目终止时间
   */
  static readonly END_DATE: string = 'endDate';

  /**
   * 投资金额
   */
  static readonly INVESTMENT_AMOUNT: string = 'investmentAmount';

  /**
   * 投资年度
   */
  static readonly INVESTMENT_YEAR: string = 'investmentYear';

  /**
   * 项目组名称
   */
  static readonly NAME: string = 'name';

  /**
   * 项目组编号[unique]
   */
  static readonly PROJECT_GROUP_CODE: string = 'projectGroupCode';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 项目起始时间
   */
  static readonly START_DATE: string = 'startDate';

  /**
   * 项目组简介
   */
  static readonly SYNOPSIS: string = 'synopsis';

}

// @provide 用 工厂模式static model
export const factory = () => ProjectGroupModel;
providerWrapper([
  {
    id: 'projectGroupModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ProjectGroupModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.projectHisProjectGroupId && !param.projectProjectGroupId) {
      return {};
    }
    const include: any = [];
    param.projectHisProjectGroupId &&
      param.projectHisProjectGroupId.length > 0 &&
      include.push({ model: ProjectHisModel, as: 'projectHisProjectGroupId' });
    param.projectProjectGroupId &&
      param.projectProjectGroupId.length > 0 &&
      include.push({ model: ProjectModel, as: 'projectProjectGroupId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'projectGroupModel.createOptions',
    provider: createOptions,
  },
]);

