import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IFormCustomModel,
  FormCustomModel,
} from '../lib/models/form-custom.model';

export interface IFormCustomService extends FormCustomService {}

@provide()
export class FormCustomService extends ServiceGenericBase<FormCustomModel> {
  get Model(): any {
    return this.formCustomModel;
  }

  @inject()
  formCustomModel: IFormCustomModel;
}
