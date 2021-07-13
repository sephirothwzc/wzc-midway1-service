import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IWebapiModel, WebapiModel } from '../lib/models/webapi.model';
import { IAppClientService } from './app-client.service';

export interface IWebapiService extends WebapiService {}

@provide()
export class WebapiService extends ServiceGenericBase<WebapiModel> {
  get Model(): any {
    return this.webapiModel;
  }
  
  @inject()
  webapiModel: IWebapiModel;

  @inject()
  appClientService: IAppClientService;
  /**
   * 新增
   * @param values
   */
  public async create(values: WebapiModel, useOptions?: CreateOptions): Promise<WebapiModel> {
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
