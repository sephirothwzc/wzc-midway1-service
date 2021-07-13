import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { ComponentModel } from './component.model';
import { ComponentControlerRoleModel } from './component-controler-role.model';
// #region enum
export enum EComponentControlerControlCode {
  /**
   *
   */
  unique = 'unique',

}

export enum EComponentControlerControlKey {
  /**
   *
   */
  unique = 'unique',

}

export enum EComponentControlerControlName {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * 组件内控件
 */
export type IComponentControlerModel = typeof ComponentControlerModel;

/**
 * 组件内控件
 */
@Table({
  tableName: 'component_controler',
  comment: '组件内控件',
})
export class ComponentControlerModel extends BaseModel {
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
   * 控件名称[unique]
   */
  @Column({ comment: '控件名称[unique]', type: DataType.STRING(100) })
  controlCode?: EComponentControlerControlCode;
  /**
   * 控件唯一约束key[unique]
   */
  @Column({ comment: '控件唯一约束key[unique]', type: DataType.STRING(100) })
  controlKey?: EComponentControlerControlKey;
  /**
   * 控件名称[unique]
   */
  @Column({ comment: '控件名称[unique]', type: DataType.STRING(100) })
  controlName?: EComponentControlerControlName;
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
  @ForeignKey(() => ComponentControlerModel)
  @Column({ comment: '父级地址id', type: DataType.STRING(50) })
  parentId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @BelongsTo(() => ComponentControlerModel, 'parent_id')
  parentIdObj: ComponentControlerModel;

  @HasMany(() => ComponentControlerModel, 'parent_id')
  componentControlerParentId: Array<ComponentControlerModel>;

  @BelongsTo(() => ComponentModel, 'component_id')
  componentIdObj: ComponentModel;

  @HasMany(() => ComponentControlerRoleModel, 'component_controler_id')
  componentControlerRoleComponentControlerId: Array<ComponentControlerRoleModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class COMPONENT_CONTROLER {

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
   * 控件名称[unique]
   */
  static readonly CONTROL_CODE: string = 'controlCode';

  /**
   * 控件唯一约束key[unique]
   */
  static readonly CONTROL_KEY: string = 'controlKey';

  /**
   * 控件名称[unique]
   */
  static readonly CONTROL_NAME: string = 'controlName';

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
export const factory = () => ComponentControlerModel;
providerWrapper([
  {
    id: 'componentControlerModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: ComponentControlerModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.componentControlerParentId && !param.componentControlerRoleComponentControlerId) {
      return {};
    }
    const include: any = [];
    param.componentControlerParentId &&
      param.componentControlerParentId.length > 0 &&
      include.push({ model: ComponentControlerModel, as: 'componentControlerParentId' });
    param.componentControlerRoleComponentControlerId &&
      param.componentControlerRoleComponentControlerId.length > 0 &&
      include.push({ model: ComponentControlerRoleModel, as: 'componentControlerRoleComponentControlerId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'componentControlerModel.createOptions',
    provider: createOptions,
  },
]);

