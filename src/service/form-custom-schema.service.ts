import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IFormCustomSchemaModel } from '../lib/models/form-custom-schema.model';

export interface IFormCustomSchemaService extends FormCustomSchemaService {}

@provide()
export class FormCustomSchemaService extends ServiceBase {
  get Model(): any {
    return this.formCustomSchemaModel;
  }
  
  @inject()
  formCustomSchemaModel: IFormCustomSchemaModel;
}
