import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IFormCustomModel } from '../lib/models/form-custom.model';

export interface IFormCustomService extends FormCustomService {}

@provide()
export class FormCustomService extends ServiceBase {
  get Model(): any {
    return this.formCustomModel;
  }
  
  @inject()
  formCustomModel: IFormCustomModel;
}
