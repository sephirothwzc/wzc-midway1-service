import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { ISchemaModelModel } from '../lib/models/schema-model.model';

export interface ISchemaModelService extends SchemaModelService {}

@provide()
export class SchemaModelService extends ServiceBase {
  get Model(): any {
    return this.schemaModelModel;
  }
  
  @inject()
  schemaModelModel: ISchemaModelModel;
}
