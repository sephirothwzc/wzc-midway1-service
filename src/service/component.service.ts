import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IComponentModel } from '../lib/models/component.model';

export interface IComponentService extends ComponentService {}

@provide()
export class ComponentService extends ServiceBase {
  get Model(): any {
    return this.componentModel;
  }
  
  @inject()
  componentModel: IComponentModel;
}
