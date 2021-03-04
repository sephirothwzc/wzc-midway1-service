import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IComponentControlerModel } from '../lib/models/component-controler.model';

export interface IComponentControlerService extends ComponentControlerService {}

@provide()
export class ComponentControlerService extends ServiceBase {
  get Model(): any {
    return this.componentControlerModel;
  }
  
  @inject()
  componentControlerModel: IComponentControlerModel;
}
