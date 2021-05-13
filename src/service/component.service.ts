import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IComponentModel, ComponentModel } from '../lib/models/component.model';

export interface IComponentService extends ComponentService {}

@provide()
export class ComponentService extends ServiceGenericBase<ComponentModel> {
  get Model(): any {
    return this.componentModel;
  }

  @inject()
  componentModel: IComponentModel;
}
