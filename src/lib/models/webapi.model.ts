import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { WebapiRoleModel } from './webapi-role.model';
// #region enum
export enum EWebapiCode {
  /**
   *
   */
  unique = 'unique',

}

export enum EWebapiPath {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * serverapi
 */
export type IWebapiModel = typeof WebapiModel;

/**
 * serverapi
 */
@Table({
  tableName: 'webapi',
  comment: 'serverapi',
})
export class WebapiModel extends BaseModel {
  /**
   * app_client
   */
  @ForeignKey(() => AppClientModel)
  @Column({ comment: 'app_client', type: DataType.STRING(50) })
  appId?: string;
  /**
   * 请求权限
   */
  @Column({ comment: '请求权限', type: DataType.STRING(100) })
  authApiState?: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 路由编码[unique]
   */
  @Column({ comment: '路由编码[unique]', type: DataType.STRING(50) })
  code?: EWebapiCode;
  /**
   * 说明
   */
  @Column({ comment: '说明', type: DataType.STRING(50) })
  comment?: string;
  /**
   * 显示编码
   */
  @Column({ comment: '显示编码', type: DataType.STRING(100) })
  displayCode?: string;
  /**
   * 显示文本
   */
  @Column({ comment: '显示文本', type: DataType.STRING(100) })
  displayTxt?: string;
  /**
   * 请求方法
   */
  @Column({ comment: '请求方法', type: DataType.STRING(10) })
  methodType?: string;
  /**
   * 路由参数
   */
  @Column({ comment: '路由参数', type: DataType.JSON })
  params?: Record<string, any>;
  /**
   * 父级地址id
   */
  @ForeignKey(() => WebapiModel)
  @Column({ comment: '父级地址id', type: DataType.STRING(50) })
  parentId?: string;
  /**
   * 路由[unique]
   */
  @Column({ comment: '路由[unique]', type: DataType.STRING(50) })
  path?: EWebapiPath;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => WebapiModel, 'parent_id')
  parentIdObj: WebapiModel;

  @HasMany(() => WebapiModel, 'parent_id')
  webapiParentId: Array<WebapiModel>;

  @HasMany(() => WebapiRoleModel, 'webapi_id')
  webapiRoleWebapiId: Array<WebapiRoleModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class WEBAPI {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 请求权限
   */
  static readonly AUTH_API_STATE: string = 'authApiState';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 路由编码[unique]
   */
  static readonly CODE: string = 'code';

  /**
   * 说明
   */
  static readonly COMMENT: string = 'comment';

  /**
   * 显示编码
   */
  static readonly DISPLAY_CODE: string = 'displayCode';

  /**
   * 显示文本
   */
  static readonly DISPLAY_TXT: string = 'displayTxt';

  /**
   * 请求方法
   */
  static readonly METHOD_TYPE: string = 'methodType';

  /**
   * 路由参数
   */
  static readonly PARAMS: string = 'params';

  /**
   * 父级地址id
   */
  static readonly PARENT_ID: string = 'parentId';

  /**
   * 路由[unique]
   */
  static readonly PATH: string = 'path';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => WebapiModel;
providerWrapper([
  {
    id: 'webapiModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: WebapiModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.webapiParentId && !param.webapiRoleWebapiId) {
      return {};
    }
    const include: any = [];
    param.webapiParentId &&
      param.webapiParentId.length > 0 &&
      include.push({ model: WebapiModel, as: 'webapiParentId' });
    param.webapiRoleWebapiId &&
      param.webapiRoleWebapiId.length > 0 &&
      include.push({ model: WebapiRoleModel, as: 'webapiRoleWebapiId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'webapiModel.createOptions',
    provider: createOptions,
  },
]);

