import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IWebapiModel, WebapiModel } from '../lib/models/webapi.model';
import { IWebapiService } from './webapi.service';

export interface IWebapiService extends WebapiService {}

@provide()
export class WebapiService extends ServiceGenericBase<WebapiModel> {
  get Model(): any {
    return this.webapiModel;
  }
  
  @inject()
  webapiModel: IWebapiModel;

  @inject()
  webapiService: IWebapiService;
  /**
   * 新增
   * @param values
   */
  public async create(values: WebapiModel, useOptions?: CreateOptions): Promise<WebapiModel> {
    const run = async (t: Transaction) => {
      if (values.parentIdObj && !values.parentId) {
        values.parentId = (
          await this.webapiService.create(values.parentIdObj, {
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
