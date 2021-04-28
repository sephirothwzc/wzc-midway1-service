import { Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { BaseModel } from '../base/model.base';
import { providerWrapper } from 'midway';
import { BudgetModel } from './budget.model';
import { ContractModel } from './contract.model';
import { ProjectHisModel } from './project-his.model';
import { ProjectModel } from './project.model';
// #region enum

// #endregion

// 依赖注入 导出类型
/**
 * 组织架构
 */
export type IOrganizationModel = typeof OrganizationModel;

/**
 * 组织架构
 */
@Table({
  tableName: 'organization',
  comment: '组织架构',
})
export class OrganizationModel extends BaseModel {
  /**
   * 业务编码权限用
   */
  @Column({ comment: '业务编码权限用', type: DataType.STRING(500) })
  businessCode: string;
  /**
   * 编码
   */
  @Column({ comment: '编码', type: DataType.STRING(50) })
  code?: string;
  /**
   * 名称
   */
  @Column({ comment: '名称', type: DataType.STRING(50) })
  name?: string;
  /**
   * 父级id
   */
  @ForeignKey(() => OrganizationModel)
  @Column({ comment: '父级id', type: DataType.STRING(50) })
  parentId?: string;
  /**
   * 备注
   */
  @Column({ comment: '备注', type: DataType.STRING(500) })
  remark: string;
  /**
   * 状态值
   */
  @Column({ comment: '状态值', type: DataType.STRING(20) })
  status?: string;
  /**
   * 科室、角色
   */
  @Column({ comment: '科室、角色', type: DataType.STRING(50) })
  type?: string;

  @HasMany(() => BudgetModel, 'department')
  budgetDepartment: Array<BudgetModel>;

  @HasMany(() => ContractModel, 'organization_id')
  contractOrganizationId: Array<ContractModel>;

  @BelongsTo(() => OrganizationModel, 'parent_id')
  parentIdObj: OrganizationModel;

  @HasMany(() => OrganizationModel, 'parent_id')
  organizationParentId: Array<OrganizationModel>;

  @HasMany(() => ProjectHisModel, 'responsible_organization_id')
  projectHisResponsibleOrganizationId: Array<ProjectHisModel>;

  @HasMany(() => ProjectModel, 'responsible_organization_id')
  projectResponsibleOrganizationId: Array<ProjectModel>;

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class ORGANIZATION {

  /**
   * 业务编码权限用
   */
  static readonly BUSINESS_CODE: string = 'businessCode';

  /**
   * 编码
   */
  static readonly CODE: string = 'code';

  /**
   * 名称
   */
  static readonly NAME: string = 'name';

  /**
   * 父级id
   */
  static readonly PARENT_ID: string = 'parentId';

  /**
   * 备注
   */
  static readonly REMARK: string = 'remark';

  /**
   * 状态值
   */
  static readonly STATUS: string = 'status';

  /**
   * 科室、角色
   */
  static readonly TYPE: string = 'type';

}

// @provide 用 工厂模式static model
export const factory = () => OrganizationModel;
providerWrapper([
  {
    id: 'organizationModel',
    provider: factory,
  },
]);

export const createOptions = () => {
  return (
    param: OrganizationModel
  ): { include?: [any]; transaction?: any; validate?: boolean } => {
    if (!param.budgetDepartment && !param.contractOrganizationId && !param.organizationParentId && !param.projectHisResponsibleOrganizationId && !param.projectResponsibleOrganizationId) {
      return {};
    }
    const include: any = [];
    param.budgetDepartment &&
      param.budgetDepartment.length > 0 &&
      include.push({ model: BudgetModel, as: 'budgetDepartment' });
    param.contractOrganizationId &&
      param.contractOrganizationId.length > 0 &&
      include.push({ model: ContractModel, as: 'contractOrganizationId' });
    param.organizationParentId &&
      param.organizationParentId.length > 0 &&
      include.push({ model: OrganizationModel, as: 'organizationParentId' });
    param.projectHisResponsibleOrganizationId &&
      param.projectHisResponsibleOrganizationId.length > 0 &&
      include.push({ model: ProjectHisModel, as: 'projectHisResponsibleOrganizationId' });
    param.projectResponsibleOrganizationId &&
      param.projectResponsibleOrganizationId.length > 0 &&
      include.push({ model: ProjectModel, as: 'projectResponsibleOrganizationId' });
    return { include };
  };
};
providerWrapper([
  {
    id: 'organizationModel.createOptions',
    provider: createOptions,
  },
]);

