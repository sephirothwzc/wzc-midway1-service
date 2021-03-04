import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IComponentControlerRoleModel } from '../lib/models/component-controler-role.model';

export interface IComponentControlerRoleService extends ComponentControlerRoleService {}

@provide()
export class ComponentControlerRoleService extends ServiceBase {
  get Model(): any {
    return this.componentControlerRoleModel;
  }
  
  @inject()
  componentControlerRoleModel: IComponentControlerRoleModel;
}
