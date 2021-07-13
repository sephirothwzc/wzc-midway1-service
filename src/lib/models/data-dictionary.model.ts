import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
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
   * app_client
   */
  @ForeignKey(() => AppClientModel)
  @Column({ comment: 'app_client', type: DataType.STRING(50) })
  appId?: string;
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

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => DataDictionaryModel, 'parent_id')
  parentIdObj: DataDictionaryModel;

  @HasMany(() => DataDictionaryModel, 'parent_id')
  dataDictionaryParentId: Array<DataDictionaryModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class DATA_DICTIONARY {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

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
    if (!param.dataDictionaryParentId) {
      return {};
    }
    const include: any = [];
    param.dataDictionaryParentId &&
      param.dataDictionaryParentId.length > 0 &&
      include.push({ model: DataDictionaryModel, as: 'dataDictionaryParentId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'dataDictionaryModel.createOptions',
    provider: createOptions,
  },
]);

