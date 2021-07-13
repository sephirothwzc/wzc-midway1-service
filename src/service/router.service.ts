import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IRouterModel, RouterModel } from '../lib/models/router.model';
import { IAppClientService } from './app-client.service';
import { IComponentService } from './component.service';

export interface IRouterService extends RouterService {}

@provide()
export class RouterService extends ServiceGenericBase<RouterModel> {
  get Model(): any {
    return this.routerModel;
  }
  
  @inject()
  routerModel: IRouterModel;

  @inject()
  appClientService: IAppClientService;
  @inject()
  componentService: IComponentService;
  /**
   * 新增
   * @param values
   */
  public async create(values: RouterModel, useOptions?: CreateOptions): Promise<RouterModel> {
    const run = async (t: Transaction) => {
      if (values.appIdObj && !values.appId) {
        values.appId = (
          await this.appClientService.create(values.appIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.componentIdObj && !values.componentId) {
        values.componentId = (
          await this.componentService.create(values.componentIdObj, {
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
