import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { FORM_CUSTOM_SCHEMA, FormCustomSchemaModel } from '../models/form-custom-schema.model';
import * as Bb from 'bluebird';

@provide('FormCustomHook')
export class FormCustomHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { formCustomSchemaIbfk1 } = await Bb.props({
        formCustomSchemaIbfk1: FormCustomSchemaModel.findOne({
          where: {
            [FORM_CUSTOM_SCHEMA.FORM_CUSTOM_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (formCustomSchemaIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
