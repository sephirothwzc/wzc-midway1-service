import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { ISchemaOrmModel } from '../lib/models/schema-orm.model';

export interface ISchemaOrmService extends SchemaOrmService {}

@provide()
export class SchemaOrmService extends ServiceBase {
  get Model(): any {
    return this.schemaOrmModel;
  }
  
  @inject()
  schemaOrmModel: ISchemaOrmModel;
}
