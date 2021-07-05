import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ContractHisModel } from './contract-his.model';
import { ContractFileModel } from './contract-file.model';
import { ContractModel } from './contract.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 合同文件历史
 */
export type IContractFileHisModel = typeof ContractFileHisModel;

/**
 * 合同文件历史
 */
@Table({
  tableName: 'contract_file_his',
  comment: '合同文件历史',
})
export class ContractFileHisModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 合同文件id
   */
  @ForeignKey(() => ContractFileModel)
  @Column({ comment: '合同文件id', type: DataType.STRING(50) })
  contractFileId?: string;
  /**
   * 合同历史id
   */
  @ForeignKey(() => ContractHisModel)
  @Column({ comment: '合同历史id', type: DataType.STRING(50) })
  contractHisId?: string;
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

  @BelongsTo(() => ContractHisModel, 'contract_his_id')
  contractHisIdObj: ContractHisModel;

  @BelongsTo(() => ContractFileModel, 'contract_file_id')
  contractFileIdObj: ContractFileModel;

  @BelongsTo(() => ContractModel, 'contract_id')
  contractIdObj: ContractModel;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class CONTRACT_FILE_HIS {
  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 合同文件id
   */
  static readonly CONTRACT_FILE_ID: string = 'contractFileId';

  /**
   * 合同历史id
   */
  static readonly CONTRACT_HIS_ID: string = 'contractHisId';

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
export const factory = () => ContractFileHisModel;
providerWrapper([
  {
    id: 'contractFileHisModel',
    provider: factory,
  },
]);
