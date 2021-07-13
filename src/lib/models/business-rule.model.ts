import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { AppClientModel } from './app-client.model';
import { BusinessSchemaModel } from './business-schema.model';
// #region enum
export enum EBusinessRuleRuleCode {
  /**
   *
   */
  unique = 'unique',

}

export enum EBusinessRuleRuleName {
  /**
   *
   */
  unique = 'unique',

}


// #endregion

// 依赖注入 导出类型
/**
 * 业务编码规则
 */
export type IBusinessRuleModel = typeof BusinessRuleModel;

/**
 * 业务编码规则
 */
@Table({
  tableName: 'business_rule',
  comment: '业务编码规则',
})
export class BusinessRuleModel extends BaseModel {
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
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 规则编码[unique]
   */
  @Column({ comment: '规则编码[unique]', type: DataType.STRING(50) })
  ruleCode?: EBusinessRuleRuleCode;
  /**
   * 规则名称[unique]
   */
  @Column({ comment: '规则名称[unique]', type: DataType.STRING(50) })
  ruleName?: EBusinessRuleRuleName;
  /**
   * 规则
   */
  @Column({ comment: '规则', type: DataType.JSON })
  ruleValue?: Record<string, any>;

  @BelongsTo(() => AppClientModel, 'app_id')
  appIdObj: AppClientModel;

  @HasMany(() => BusinessSchemaModel, 'business_rule_id')
  businessSchemaBusinessRuleId: Array<BusinessSchemaModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class BUSINESS_RULE {

  /**
   * app_client
   */
  static readonly APP_ID: string = 'appId';

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 规则编码[unique]
   */
  static readonly RULE_CODE: string = 'ruleCode';

  /**
   * 规则名称[unique]
   */
  static readonly RULE_NAME: string = 'ruleName';

  /**
   * 规则
   */
  static readonly RULE_VALUE: string = 'ruleValue';

}

// @provide 用 工厂模式static model
export const factory = () => BusinessRuleModel;
providerWrapper([
  {
    id: 'businessRuleModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: BusinessRuleModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.businessSchemaBusinessRuleId) {
      return {};
    }
    const include: any = [];
    param.businessSchemaBusinessRuleId &&
      param.businessSchemaBusinessRuleId.length > 0 &&
      include.push({ model: BusinessSchemaModel, as: 'businessSchemaBusinessRuleId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'businessRuleModel.createOptions',
    provider: createOptions,
  },
]);

