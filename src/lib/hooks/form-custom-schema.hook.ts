import * as _ from 'lodash';
import { toNumber } from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  FORM_CUSTOM_SCHEMA,
  FormCustomSchemaModel,
} from '../models/form-custom-schema.model';

@provide('FormCustomSchemaHook')
export class FormCustomSchemaHook {
  async beforeCreate(
    model: FormCustomSchemaModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    !model.version && model.set('version', 1);
    if (!model.get('formCustomId')) {
      throw new Error('formCustomId must require');
    }
    const item0 = await FormCustomSchemaModel.findOne({
      where: {
        [FORM_CUSTOM_SCHEMA.FORM_CUSTOM_ID]: model.get('formCustomId'),
      },
      order: [['version', 'DESC']],
      transaction: options?.transaction,
    });
    item0 && model.set('version', toNumber(item0.get('version')) + 1);
    return model;
  }
}
