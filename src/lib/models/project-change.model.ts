import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ProjectChangeFileModel } from './project-change-file.model';
import { ProjectModel } from './project.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 项目变更
 */
export type IProjectChangeModel = typeof ProjectChangeModel;

/**
 * 项目变更
 */
@Table({
  tableName: 'project_change',
  comment: '项目变更',
})
export class ProjectChangeModel extends BaseModel {
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
   * 项目id
   */
  @ForeignKey(() => ProjectModel)
  @Column({ comment: '项目id', type: DataType.STRING(50) })
  projectId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @HasMany(() => ProjectChangeFileModel, 'project_change_id')
  projectChangeFileProjectChangeId: Array<ProjectChangeFileModel>;

  @BelongsTo(() => ProjectModel, 'project_id')
  projectIdObj: ProjectModel;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class PROJECT_CHANGE {

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
   * 项目id
   */
  static readonly PROJECT_ID: string = 'projectId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => ProjectChangeModel;
providerWrapper([
  {
    id: 'projectChangeModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ProjectChangeModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.projectChangeFileProjectChangeId) {
      return {};
    }
    const include: any = [];
    param.projectChangeFileProjectChangeId &&
      param.projectChangeFileProjectChangeId.length > 0 &&
      include.push({ model: ProjectChangeFileModel, as: 'projectChangeFileProjectChangeId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'projectChangeModel.createOptions',
    provider: createOptions,
  },
]);

