import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IFormCustomModel, FormCustomModel } from '../lib/models/form-custom.model';
import { IAppClientService } from './app-client.service';

export interface IFormCustomService extends FormCustomService {}

@provide()
export class FormCustomService extends ServiceGenericBase<FormCustomModel> {
  get Model(): any {
    return this.formCustomModel;
  }
  
  @inject()
  formCustomModel: IFormCustomModel;

  @inject()
  appClientService: IAppClientService;
  /**
   * 新增
   * @param values
   */
  public async create(values: FormCustomModel, useOptions?: CreateOptions): Promise<FormCustomModel> {
    const run = async (t: Transaction) => {
      if (values.appIdObj && !values.appId) {
        values.appId = (
          await this.appClientService.create(values.appIdObj, {
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
