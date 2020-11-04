import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IAppUserModel } from '../lib/models/app-user.model';

export interface IAppUserService extends AppUserService {}

@provide()
export class AppUserService extends ServiceBase {
  get Model(): any {
    return this.appUserModel;
  }
  
  @inject()
  appUserModel: IAppUserModel;
}
