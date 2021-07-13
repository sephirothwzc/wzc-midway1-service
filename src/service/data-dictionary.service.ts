import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IDataDictionaryModel, DataDictionaryModel } from '../lib/models/data-dictionary.model';
import { IAppClientService } from './app-client.service';

export interface IDataDictionaryService extends DataDictionaryService {}

@provide()
export class DataDictionaryService extends ServiceGenericBase<DataDictionaryModel> {
  get Model(): any {
    return this.dataDictionaryModel;
  }
  
  @inject()
  dataDictionaryModel: IDataDictionaryModel;

  @inject()
  appClientService: IAppClientService;
  /**
   * 新增
   * @param values
   */
  public async create(values: DataDictionaryModel, useOptions?: CreateOptions): Promise<DataDictionaryModel> {
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
