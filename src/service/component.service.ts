import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IComponentModel, ComponentModel } from '../lib/models/component.model';
import { IComponentService } from './component.service';

export interface IComponentService extends ComponentService {}

@provide()
export class ComponentService extends ServiceGenericBase<ComponentModel> {
  get Model(): any {
    return this.componentModel;
  }
  
  @inject()
  componentModel: IComponentModel;

  @inject()
  componentService: IComponentService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ComponentModel, useOptions?: CreateOptions): Promise<ComponentModel> {
    const run = async (t: Transaction) => {
      if (values.parentIdObj && !values.parentId) {
        values.parentId = (
          await this.componentService.create(values.parentIdObj, {
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
