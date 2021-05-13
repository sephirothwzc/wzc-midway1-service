import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IDataDictionaryModel,
  DataDictionaryModel,
} from '../lib/models/data-dictionary.model';

export interface IDataDictionaryService extends DataDictionaryService {}

@provide()
export class DataDictionaryService extends ServiceGenericBase<DataDictionaryModel> {
  get Model(): any {
    return this.dataDictionaryModel;
  }

  @inject()
  dataDictionaryModel: IDataDictionaryModel;
}
