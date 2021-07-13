import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { ComponentControlerModel } from './component-controler.model';
import { AppClientModel } from './app-client.model';
import { RouterModel } from './router.model';
// #region enum
export enum EComponentComponentCode {
  /**
   *
   */
  unique = 'unique',

}

export enum EComponentComponentKey {
  /**
   *
   */
  unique = 'unique',

}

export enum EComponentComponentName {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * 组件
 */
export type IComponentModel = typeof ComponentModel;

/**
 * 组件
 */
@Table({
  tableName: 'component',
  comment: '组件',
})
export class ComponentModel extends BaseModel {
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
   * 组件名称[unique]
   */
  @Column({ comment: '组件名称[unique]', type: DataType.STRING(100) })
  componentCode?: EComponentComponentCode;
  /**
   * 组件唯一约束key[unique]
   */
  @Column({ comment: '组件唯一约束key[unique]', type: DataType.STRING(100) })
  componentKey?: EComponentComponentKey;
  /**
   * 组件名称[unique]
   */
  @Column({ comment: '组件名称[unique]', type: DataType.STRING(100) })
  componentName?: EComponentComponentName;
  /**
   * 控件属性
   */
  @Column({ comment: '控件属性', type: DataType.JSON })
  controlProperty?: Record<string, any>;
  /**
   * 控件类型
   */
  @Column({ comment: '控件类型', type: DataType.STRING(50) })
  controlType?: string;
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
   * 组件路径
   */
  @Column({ comment: '组件路径', type: DataType.STRING(2000) })
  filePath?: string;
  /**
   * 父级地址id
   */
  @ForeignKey(() => ComponentModel)
  @Column({ comment: '父级地址id', type: DataType.STRING(50) })
  parentId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @HasMany(() => ComponentControlerModel, 'component_id')
  componentControlerComponentId: Array<ComponentControlerModel>;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => ComponentModel, 'parent_id')
  parentIdObj: ComponentModel;

  @HasMany(() => ComponentModel, 'parent_id')
  componentParentId: Array<ComponentModel>;

  @HasMany(() => RouterModel, 'component_id')
  routerComponentId: Array<RouterModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class COMPONENT {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 组件名称[unique]
   */
  static readonly COMPONENT_CODE: string = 'componentCode';

  /**
   * 组件唯一约束key[unique]
   */
  static readonly COMPONENT_KEY: string = 'componentKey';

  /**
   * 组件名称[unique]
   */
  static readonly COMPONENT_NAME: string = 'componentName';

  /**
   * 控件属性
   */
  static readonly CONTROL_PROPERTY: string = 'controlProperty';

  /**
   * 控件类型
   */
  static readonly CONTROL_TYPE: string = 'controlType';

  /**
   * 显示编码
   */
  static readonly DISPLAY_CODE: string = 'displayCode';

  /**
   * 显示文本
   */
  static readonly DISPLAY_TXT: string = 'displayTxt';

  /**
   * 组件路径
   */
  static readonly FILE_PATH: string = 'filePath';

  /**
   * 父级地址id
   */
  static readonly PARENT_ID: string = 'parentId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => ComponentModel;
providerWrapper([
  {
    id: 'componentModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ComponentModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.componentControlerComponentId && !param.componentParentId && !param.routerComponentId) {
      return {};
    }
    const include: any = [];
    param.componentControlerComponentId &&
      param.componentControlerComponentId.length > 0 &&
      include.push({ model: ComponentControlerModel, as: 'componentControlerComponentId' });
    param.componentParentId &&
      param.componentParentId.length > 0 &&
      include.push({ model: ComponentModel, as: 'componentParentId' });
    param.routerComponentId &&
      param.routerComponentId.length > 0 &&
      include.push({ model: RouterModel, as: 'routerComponentId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'componentModel.createOptions',
    provider: createOptions,
  },
]);

