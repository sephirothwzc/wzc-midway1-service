import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import {
  // FormCustomSchemaModel,
  // FORM_CUSTOM_SCHEMA,
  IFormCustomSchemaModel,
} from '../lib/models/form-custom-schema.model';

export interface IFormCustomSchemaService extends FormCustomSchemaService {}

@provide()
export class FormCustomSchemaService extends ServiceBase {
  get Model(): any {
    return this.formCustomSchemaModel;
  }

  @inject()
  formCustomSchemaModel: IFormCustomSchemaModel;

  // async save(model: FormCustomSchemaModel) {
  //   !model.version && (model.version = 1);
  //   if (!model.formCustomId) {
  //     throw new Error('formCustomId must require');
  //   }
  //   const item0 = await FormCustomSchemaModel.findOne({
  //     where: {
  //       [FORM_CUSTOM_SCHEMA.FORM_CUSTOM_ID]: model.formCustomId,
  //     },
  //     order: [['version', 'DESC']],
  //   });
  //   item0 && (model.version = item0.get('version') + 1);
  //   return super.save(model);
  // }
}
