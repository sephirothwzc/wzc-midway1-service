import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { ISchemaModelRoleModel } from '../lib/models/schema-model-role.model';

export interface ISchemaModelRoleService extends SchemaModelRoleService {}

@provide()
export class SchemaModelRoleService extends ServiceBase {
  get Model(): any {
    return this.schemaModelRoleModel;
  }
  
  @inject()
  schemaModelRoleModel: ISchemaModelRoleModel;
}
