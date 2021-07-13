import { Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppUserModel } from './app-user.model';
import { AppUserRoleModel } from './app-user-role.model';
import { BusinessRuleModel } from './business-rule.model';
import { BusinessSchemaModel } from './business-schema.model';
import { ComponentControlerModel } from './component-controler.model';
import { ComponentControlerRoleModel } from './component-controler-role.model';
import { ComponentModel } from './component.model';
import { DataDictionaryModel } from './data-dictionary.model';
import { FormCustomModel } from './form-custom.model';
import { RoleGroupModel } from './role-group.model';
import { RoleGroupItemModel } from './role-group-item.model';
import { RoleModel } from './role.model';
import { RouterModel } from './router.model';
import { RouterRoleModel } from './router-role.model';
import { SchemaModelModel } from './schema-model.model';
import { SchemaModelRoleModel } from './schema-model-role.model';
import { WebapiModel } from './webapi.model';
import { WebapiRoleModel } from './webapi-role.model';
import { WorkFlowModel } from './work-flow.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 终端app
 */
export type IAppClientModel = typeof AppClientModel;

/**
 * 终端app
 */
@Table({
  tableName: 'app_client',
  comment: '终端app',
})
export class AppClientModel extends BaseModel {
  /**
   * 凭证
   */
  @Column({ comment: '凭证', type: DataType.STRING(100) })
  accessToken: string;
  /**
   * 编码
   */
  @Column({ comment: '编码', type: DataType.STRING(50) })
  appCode: string;
  /**
   * 名称
   */
  @Column({ comment: '名称', type: DataType.STRING(50) })
  appName: string;
  /**
   * 用户状态N停用Y启用
   */
  @Column({ comment: '用户状态N停用Y启用', type: DataType.STRING(1) })
  appStatus: string;
  /**
   * 类型
   */
  @Column({ comment: '类型', type: DataType.STRING(10) })
  appType: string;
  /**
   * wx头像
   */
  @Column({ comment: 'wx头像', type: DataType.STRING(500) })
  avatarUrl: string;
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 系统默认头像
   */
  @Column({ comment: '系统默认头像', type: DataType.STRING(500) })
  defaultAvatar: string;
  /**
   * 注册手机号
   */
  @Column({ comment: '注册手机号', type: DataType.STRING(15) })
  phone: string;
  /**
   * 注册时间
   */
  @Column({ comment: '注册时间', type: DataType.DATE })
  registerTime: Date;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;

  @HasMany(() => AppUserModel, 'app_id')
  appUserAppId: Array<AppUserModel>;

  @HasMany(() => AppUserRoleModel, 'app_id')
  appUserRoleAppId: Array<AppUserRoleModel>;

  @HasMany(() => BusinessRuleModel, 'app_id')
  businessRuleAppId: Array<BusinessRuleModel>;

  @HasMany(() => BusinessSchemaModel, 'app_id')
  businessSchemaAppId: Array<BusinessSchemaModel>;

  @HasMany(() => ComponentControlerModel, 'app_id')
  componentControlerAppId: Array<ComponentControlerModel>;

  @HasMany(() => ComponentControlerRoleModel, 'app_id')
  componentControlerRoleAppId: Array<ComponentControlerRoleModel>;

  @HasMany(() => ComponentModel, 'app_id')
  componentAppId: Array<ComponentModel>;

  @HasMany(() => DataDictionaryModel, 'app_id')
  dataDictionaryAppId: Array<DataDictionaryModel>;

  @HasMany(() => FormCustomModel, 'app_id')
  formCustomAppId: Array<FormCustomModel>;

  @HasMany(() => RoleGroupModel, 'app_id')
  roleGroupAppId: Array<RoleGroupModel>;

  @HasMany(() => RoleGroupItemModel, 'app_id')
  roleGroupItemAppId: Array<RoleGroupItemModel>;

  @HasMany(() => RoleModel, 'app_id')
  roleAppId: Array<RoleModel>;

  @HasMany(() => RouterModel, 'app_id')
  routerAppId: Array<RouterModel>;

  @HasMany(() => RouterRoleModel, 'app_id')
  routerRoleAppId: Array<RouterRoleModel>;

  @HasMany(() => SchemaModelModel, 'app_id')
  schemaModelAppId: Array<SchemaModelModel>;

  @HasMany(() => SchemaModelRoleModel, 'app_id')
  schemaModelRoleAppId: Array<SchemaModelRoleModel>;

  @HasMany(() => WebapiModel, 'app_id')
  webapiAppId: Array<WebapiModel>;

  @HasMany(() => WebapiRoleModel, 'app_id')
  webapiRoleAppId: Array<WebapiRoleModel>;

  @HasMany(() => WorkFlowModel, 'app_id')
  workFlowAppId: Array<WorkFlowModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class APP_CLIENT {

  /**
   * 凭证
   */
  static readonly ACCESS_TOKEN: string = 'accessToken';

  /**
   * 编码
   */
  static readonly APP_CODE: string = 'appCode';

  /**
   * 名称
   */
  static readonly APP_NAME: string = 'appName';

  /**
   * 用户状态N停用Y启用
   */
  static readonly APP_STATUS: string = 'appStatus';

  /**
   * 类型
   */
  static readonly APP_TYPE: string = 'appType';

  /**
   * wx头像
   */
  static readonly AVATAR_URL: string = 'avatarUrl';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 系统默认头像
   */
  static readonly DEFAULT_AVATAR: string = 'defaultAvatar';

  /**
   * 注册手机号
   */
  static readonly PHONE: string = 'phone';

  /**
   * 注册时间
   */
  static readonly REGISTER_TIME: string = 'registerTime';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

}

// @provide 用 工厂模式static model
export const factory = () => AppClientModel;
providerWrapper([
  {
    id: 'appClientModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: AppClientModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.appUserAppId && !param.appUserRoleAppId && !param.businessRuleAppId && !param.businessSchemaAppId && !param.componentControlerAppId && !param.componentControlerRoleAppId && !param.componentAppId && !param.dataDictionaryAppId && !param.formCustomAppId && !param.roleGroupAppId && !param.roleGroupItemAppId && !param.roleAppId && !param.routerAppId && !param.routerRoleAppId && !param.schemaModelAppId && !param.schemaModelRoleAppId && !param.webapiAppId && !param.webapiRoleAppId && !param.workFlowAppId) {
      return {};
    }
    const include: any = [];
    param.appUserAppId &&
      param.appUserAppId.length > 0 &&
      include.push({ model: AppUserModel, as: 'appUserAppId' });
    param.appUserRoleAppId &&
      param.appUserRoleAppId.length > 0 &&
      include.push({ model: AppUserRoleModel, as: 'appUserRoleAppId' });
    param.businessRuleAppId &&
      param.businessRuleAppId.length > 0 &&
      include.push({ model: BusinessRuleModel, as: 'businessRuleAppId' });
    param.businessSchemaAppId &&
      param.businessSchemaAppId.length > 0 &&
      include.push({ model: BusinessSchemaModel, as: 'businessSchemaAppId' });
    param.componentControlerAppId &&
      param.componentControlerAppId.length > 0 &&
      include.push({ model: ComponentControlerModel, as: 'componentControlerAppId' });
    param.componentControlerRoleAppId &&
      param.componentControlerRoleAppId.length > 0 &&
      include.push({ model: ComponentControlerRoleModel, as: 'componentControlerRoleAppId' });
    param.componentAppId &&
      param.componentAppId.length > 0 &&
      include.push({ model: ComponentModel, as: 'componentAppId' });
    param.dataDictionaryAppId &&
      param.dataDictionaryAppId.length > 0 &&
      include.push({ model: DataDictionaryModel, as: 'dataDictionaryAppId' });
    param.formCustomAppId &&
      param.formCustomAppId.length > 0 &&
      include.push({ model: FormCustomModel, as: 'formCustomAppId' });
    param.roleGroupAppId &&
      param.roleGroupAppId.length > 0 &&
      include.push({ model: RoleGroupModel, as: 'roleGroupAppId' });
    param.roleGroupItemAppId &&
      param.roleGroupItemAppId.length > 0 &&
      include.push({ model: RoleGroupItemModel, as: 'roleGroupItemAppId' });
    param.roleAppId &&
      param.roleAppId.length > 0 &&
      include.push({ model: RoleModel, as: 'roleAppId' });
    param.routerAppId &&
      param.routerAppId.length > 0 &&
      include.push({ model: RouterModel, as: 'routerAppId' });
    param.routerRoleAppId &&
      param.routerRoleAppId.length > 0 &&
      include.push({ model: RouterRoleModel, as: 'routerRoleAppId' });
    param.schemaModelAppId &&
      param.schemaModelAppId.length > 0 &&
      include.push({ model: SchemaModelModel, as: 'schemaModelAppId' });
    param.schemaModelRoleAppId &&
      param.schemaModelRoleAppId.length > 0 &&
      include.push({ model: SchemaModelRoleModel, as: 'schemaModelRoleAppId' });
    param.webapiAppId &&
      param.webapiAppId.length > 0 &&
      include.push({ model: WebapiModel, as: 'webapiAppId' });
    param.webapiRoleAppId &&
      param.webapiRoleAppId.length > 0 &&
      include.push({ model: WebapiRoleModel, as: 'webapiRoleAppId' });
    param.workFlowAppId &&
      param.workFlowAppId.length > 0 &&
      include.push({ model: WorkFlowModel, as: 'workFlowAppId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'appClientModel.createOptions',
    provider: createOptions,
  },
]);

