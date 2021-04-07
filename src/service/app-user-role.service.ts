import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IAppUserRoleModel } from '../lib/models/app-user-role.model';

export interface IAppUserRoleService extends AppUserRoleService {}

@provide()
export class AppUserRoleService extends ServiceBase {
  get Model(): any {
    return this.appUserRoleModel;
  }
  
  @inject()
  appUserRoleModel: IAppUserRoleModel;
}
