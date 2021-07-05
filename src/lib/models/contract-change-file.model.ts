import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractChangeModel } from './contract-change.model';
import { ContractModel } from './contract.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 合同变更文件
 */
export type IContractChangeFileModel = typeof ContractChangeFileModel;

/**
 * 合同变更文件
 */
@Table({
  tableName: 'contract_change_file',
  comment: '合同变更文件',
})
export class ContractChangeFileModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 变更id
   */
  @ForeignKey(() => ContractChangeModel)
  @Column({ comment: '变更id', type: DataType.STRING(50) })
  contractChangeId?: string;
  /**
   * 合同id
   */
  @ForeignKey(() => ContractModel)
  @Column({ comment: '合同id', type: DataType.STRING(50) })
  contractId?: string;
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
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @BelongsTo(() => ContractChangeModel, 'contract_change_id')
  contractChangeIdObj: ContractChangeModel;

  @BelongsTo(() => ContractModel, 'contract_id')
  contractIdObj: ContractModel;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT_CHANGE_FILE {
  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 变更id
   */
  static readonly CONTRACT_CHANGE_ID: string = 'contractChangeId';

  /**
   * 合同id
   */
  static readonly CONTRACT_ID: string = 'contractId';

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
   * 备注
   */
  static readonly REMARK: string = 'remark';
}

// @provide 用 工厂模式static model
export const factory = () => ContractChangeFileModel;
providerWrapper([
  {
    id: 'contractChangeFileModel',
    provider: factory,
  },
]);
