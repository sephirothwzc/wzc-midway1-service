import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IComponentControlerModel,
  ComponentControlerModel,
} from '../lib/models/component-controler.model';
import { IComponentService } from './component.service';

export interface IComponentControlerService extends ComponentControlerService {}

@provide()
export class ComponentControlerService extends ServiceGenericBase<ComponentControlerModel> {
  get Model(): any {
    return this.componentControlerModel;
  }

  @inject()
  componentControlerModel: IComponentControlerModel;

  @inject()
  componentService: IComponentService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: ComponentControlerModel,
    useOptions?: CreateOptions
  ): Promise<ComponentControlerModel> {
    const run = async (t: Transaction) => {
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
