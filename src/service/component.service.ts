import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IComponentModel, ComponentModel } from '../lib/models/component.model';
import { IAppClientService } from './app-client.service';

export interface IComponentService extends ComponentService {}

@provide()
export class ComponentService extends ServiceGenericBase<ComponentModel> {
  get Model(): any {
    return this.componentModel;
  }

  @inject()
  componentModel: IComponentModel;

  @inject()
  appClientService: IAppClientService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: ComponentModel,
    useOptions?: CreateOptions
  ): Promise<ComponentModel> {
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
