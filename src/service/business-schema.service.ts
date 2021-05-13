import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IBusinessSchemaModel, BusinessSchemaModel } from '../lib/models/business-schema.model';
import { IRoleService } from './role.service';
import { IBusinessRuleService } from './business-rule.service';
import { ISchemaModelService } from './schema-model.service';

export interface IBusinessSchemaService extends BusinessSchemaService {}

@provide()
export class BusinessSchemaService extends ServiceGenericBase<BusinessSchemaModel> {
  get Model(): any {
    return this.businessSchemaModel;
  }
  
  @inject()
  businessSchemaModel: IBusinessSchemaModel;

  @inject()
  roleService: IRoleService;
  @inject()
  businessRuleService: IBusinessRuleService;
  @inject()
  schemaModelService: ISchemaModelService;
  /**
   * 新增
   * @param values
   */
  public async create(values: BusinessSchemaModel, useOptions?: CreateOptions): Promise<BusinessSchemaModel> {
    const run = async (t: Transaction) => {
      if (values.roleIdObj && !values.roleId) {
        values.roleId = (
          await this.roleService.create(values.roleIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.businessRuleIdObj && !values.businessRuleId) {
        values.businessRuleId = (
          await this.businessRuleService.create(values.businessRuleIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.schemaModelIdObj && !values.schemaModelId) {
        values.schemaModelId = (
          await this.schemaModelService.create(values.schemaModelIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      return super.create(values, {
        transaction: t,
      });
    };
    return await this.useTransaction(run, useOptions);
  }
  
}
