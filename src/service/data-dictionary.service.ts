import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IDataDictionaryModel } from '../lib/models/data-dictionary.model';

export interface IDataDictionaryService extends DataDictionaryService {}

@provide()
export class DataDictionaryService extends ServiceBase {
  get Model(): any {
    return this.dataDictionaryModel;
  }
  
  @inject()
  dataDictionaryModel: IDataDictionaryModel;
}
