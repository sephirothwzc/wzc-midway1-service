import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { ComponentModel } from './component.model';
import { RouterRoleModel } from './router-role.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 前端路由
 */
export type IRouterModel = typeof RouterModel;

/**
 * 前端路由
 */
@Table({
  tableName: 'router',
  comment: '前端路由',
})
export class RouterModel extends BaseModel {
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
   * 组件id
   */
  @ForeignKey(() => ComponentModel)
  @Column({ comment: '组件id', type: DataType.STRING(50) })
  componentId?: string;
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
   * 父级地址id
   */
  @ForeignKey(() => RouterModel)
  @Column({ comment: '父级地址id', type: DataType.STRING(50) })
  parentId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 路由编码
   */
  @Column({ comment: '路由编码', type: DataType.STRING(100) })
  routerCode?: string;
  /**
   * 路由名称
   */
  @Column({ comment: '路由名称', type: DataType.STRING(100) })
  routerName?: string;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => RouterModel, 'parent_id')
  parentIdObj: RouterModel;

  @HasMany(() => RouterModel, 'parent_id')
  routerParentId: Array<RouterModel>;

  @BelongsTo(() => ComponentModel, 'component_id')
  componentIdObj: ComponentModel;

  @HasMany(() => RouterRoleModel, 'router_id')
  routerRoleRouterId: Array<RouterRoleModel>;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class ROUTER {
  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 组件id
   */
  static readonly COMPONENT_ID: string = 'componentId';

  /**
   * 显示编码
   */
  static readonly DISPLAY_CODE: string = 'displayCode';

  /**
   * 显示文本
   */
  static readonly DISPLAY_TXT: string = 'displayTxt';

  /**
   * 父级地址id
   */
  static readonly PARENT_ID: string = 'parentId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 路由编码
   */
  static readonly ROUTER_CODE: string = 'routerCode';

  /**
   * 路由名称
   */
  static readonly ROUTER_NAME: string = 'routerName';
}

// @provide 用 工厂模式static model
export const factory = () => RouterModel;
providerWrapper([
  {
    id: 'routerModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: RouterModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.routerParentId && !param.routerRoleRouterId) {
      return {};
    }
    const include: any = [];
    param.routerParentId &&
      param.routerParentId.length > 0 &&
      include.push({ model: RouterModel, as: 'routerParentId' });
    param.routerRoleRouterId &&
      param.routerRoleRouterId.length > 0 &&
      include.push({ model: RouterRoleModel, as: 'routerRoleRouterId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'routerModel.createOptions',
    provider: createOptions,
  },
]);
