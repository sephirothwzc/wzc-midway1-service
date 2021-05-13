import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { ISchemaModelRoleModel, SchemaModelRoleModel } from '../lib/models/schema-model-role.model';
import { IRoleService } from './role.service';
import { ISchemaModelService } from './schema-model.service';

export interface ISchemaModelRoleService extends SchemaModelRoleService {}

@provide()
export class SchemaModelRoleService extends ServiceGenericBase<SchemaModelRoleModel> {
  get Model(): any {
    return this.schemaModelRoleModel;
  }
  
  @inject()
  schemaModelRoleModel: ISchemaModelRoleModel;

  @inject()
  roleService: IRoleService;
  @inject()
  schemaModelService: ISchemaModelService;
  /**
   * 新增
   * @param values
   */
  public async create(values: SchemaModelRoleModel, useOptions?: CreateOptions): Promise<SchemaModelRoleModel> {
    const run = async (t: Transaction) => {
      if (values.roleIdObj && !values.roleId) {
        values.roleId = (
          await this.roleService.create(values.roleIdObj, {
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
