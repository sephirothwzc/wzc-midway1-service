import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IAppClientModel, AppClientModel } from '../lib/models/app-client.model';


export interface IAppClientService extends AppClientService {}

@provide()
export class AppClientService extends ServiceGenericBase<AppClientModel> {
  get Model(): any {
    return this.appClientModel;
  }
  
  @inject()
  appClientModel: IAppClientModel;

}
