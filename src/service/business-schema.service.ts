import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IBusinessSchemaModel } from '../lib/models/business-schema.model';

export interface IBusinessSchemaService extends BusinessSchemaService {}

@provide()
export class BusinessSchemaService extends ServiceBase {
  get Model(): any {
    return this.businessSchemaModel;
  }
  
  @inject()
  businessSchemaModel: IBusinessSchemaModel;
}
