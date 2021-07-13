import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';

// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 文件上传记录表
 */
export type IFileModel = typeof FileModel;

/**
 * 文件上传记录表
 */
@Table({
  tableName: 'file',
  comment: '文件上传记录表',
})
export class FileModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 编码
   */
  @Column({ comment: '编码', type: DataType.STRING(200) })
  encoding: string;
  /**
   * 字断名
   */
  @Column({ comment: '字断名', type: DataType.STRING(200) })
  fieldname: string;
  /**
   * 文件名
   */
  @Column({ comment: '文件名', type: DataType.STRING(200) })
  filename: string;
  /**
   * tmp 文件路径
   */
  @Column({ comment: 'tmp 文件路径', type: DataType.STRING(500) })
  filepath: string;
  /**
   * 文件名称
   */
  @Column({ comment: '文件名称', type: DataType.STRING(200) })
  mime: string;
  /**
   * oss上传完整路径
   */
  @Column({ comment: 'oss上传完整路径', type: DataType.STRING(1000) })
  ossFilepath: string;
  /**
   * oss上传文件id名字
   */
  @Column({ comment: 'oss上传文件id名字', type: DataType.STRING(200) })
  ossName: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class FILE {
  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 编码
   */
  static readonly ENCODING: string = 'encoding';

  /**
   * 字断名
   */
  static readonly FIELDNAME: string = 'fieldname';

  /**
   * 文件名
   */
  static readonly FILENAME: string = 'filename';

  /**
   * tmp 文件路径
   */
  static readonly FILEPATH: string = 'filepath';

  /**
   * 文件名称
   */
  static readonly MIME: string = 'mime';

  /**
   * oss上传完整路径
   */
  static readonly OSS_FILEPATH: string = 'ossFilepath';

  /**
   * oss上传文件id名字
   */
  static readonly OSS_NAME: string = 'ossName';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';
}

// @provide 用 工厂模式static model
export const factory = () => FileModel;
providerWrapper([
  {
    id: 'fileModel',
    provider: factory,
  },
]);
