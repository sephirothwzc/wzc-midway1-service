import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { ICapitalAccountModel } from '../lib/models/capital-account.model';

export interface ICapitalAccountService extends CapitalAccountService {}

@provide()
export class CapitalAccountService extends ServiceBase {
  get Model(): any {
    return this.capitalAccountModel;
  }
  
  @inject()
  capitalAccountModel: ICapitalAccountModel;
}
