import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ProjectChangeModel } from './project-change.model';
import { ProjectModel } from './project.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 项目变更文件
 */
export type IProjectChangeFileModel = typeof ProjectChangeFileModel;

/**
 * 项目变更文件
 */
@Table({
  tableName: 'project_change_file',
  comment: '项目变更文件',
})
export class ProjectChangeFileModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 文件类型
   */
  @Column({ comment: '文件类型', type: DataType.STRING(50) })
  fileType?: string;
  /**
   * 文件名
   */
  @Column({ comment: '文件名', type: DataType.STRING(500) })
  imageName: string;
  /**
   * 路径
   */
  @Column({ comment: '路径', type: DataType.STRING(500) })
  imagePath: string;
  /**
   * 文件大小
   */
  @Column({ comment: '文件大小', type: DataType.INTEGER })
  imageSize: number;
  /**
   * 文件名后缀
   */
  @Column({ comment: '文件名后缀', type: DataType.STRING(200) })
  imageSuffix: string;
  /**
   * 域名 默认空，走config的oss url
   */
  @Column({
    comment: '域名 默认空，走config的oss url',
    type: DataType.STRING(500),
  })
  imageUri: string;
  /**
   * 变更id
   */
  @ForeignKey(() => ProjectChangeModel)
  @Column({ comment: '变更id', type: DataType.STRING(50) })
  projectChangeId?: string;
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

  @BelongsTo(() => ProjectChangeModel, 'project_change_id')
  projectChangeIdObj: ProjectChangeModel;

  @BelongsTo(() => ProjectModel, 'project_id')
  projectIdObj: ProjectModel;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class PROJECT_CHANGE_FILE {
  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 文件类型
   */
  static readonly FILE_TYPE: string = 'fileType';

  /**
   * 文件名
   */
  static readonly IMAGE_NAME: string = 'imageName';

  /**
   * 路径
   */
  static readonly IMAGE_PATH: string = 'imagePath';

  /**
   * 文件大小
   */
  static readonly IMAGE_SIZE: string = 'imageSize';

  /**
   * 文件名后缀
   */
  static readonly IMAGE_SUFFIX: string = 'imageSuffix';

  /**
   * 域名 默认空，走config的oss url
   */
  static readonly IMAGE_URI: string = 'imageUri';

  /**
   * 变更id
   */
  static readonly PROJECT_CHANGE_ID: string = 'projectChangeId';

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
export const factory = () => ProjectChangeFileModel;
providerWrapper([
  {
    id: 'projectChangeFileModel',
    provider: factory,
  },
]);
