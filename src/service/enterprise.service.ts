import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IEnterpriseModel, EnterpriseModel } from '../lib/models/enterprise.model';
import { IDataDictionaryService } from './data-dictionary.service';

export interface IEnterpriseService extends EnterpriseService {}

@provide()
export class EnterpriseService extends ServiceGenericBase<EnterpriseModel> {
  get Model(): any {
    return this.enterpriseModel;
  }
  
  @inject()
  enterpriseModel: IEnterpriseModel;

  @inject()
  dataDictionaryService: IDataDictionaryService;
  /**
   * 新增
   * @param values
   */
  public async create(values: EnterpriseModel, useOptions?: CreateOptions): Promise<EnterpriseModel> {
    const run = async (t: Transaction) => {
      if (values.enterpriseTypeIdObj && !values.enterpriseTypeId) {
        values.enterpriseTypeId = (
          await this.dataDictionaryService.create(values.enterpriseTypeIdObj, {
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
