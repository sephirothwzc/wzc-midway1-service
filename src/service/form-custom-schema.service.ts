import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IFormCustomSchemaModel, FormCustomSchemaModel } from '../lib/models/form-custom-schema.model';
import { IFormCustomService } from './form-custom.service';

export interface IFormCustomSchemaService extends FormCustomSchemaService {}

@provide()
export class FormCustomSchemaService extends ServiceGenericBase<FormCustomSchemaModel> {
  get Model(): any {
    return this.formCustomSchemaModel;
  }
  
  @inject()
  formCustomSchemaModel: IFormCustomSchemaModel;

  @inject()
  formCustomService: IFormCustomService;
  /**
   * 新增
   * @param values
   */
  public async create(values: FormCustomSchemaModel, useOptions?: CreateOptions): Promise<FormCustomSchemaModel> {
    const run = async (t: Transaction) => {
      if (values.formCustomIdObj && !values.formCustomId) {
        values.formCustomId = (
          await this.formCustomService.create(values.formCustomIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      return super.create(values, {
        transaction: t,
      });
    };
    return await this.useTransaction(run, useOptions);
  }
  
}
