import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IEnterpriseModel } from '../lib/models/enterprise.model';

export interface IEnterpriseService extends EnterpriseService {}

@provide()
export class EnterpriseService extends ServiceBase {
  get Model(): any {
    return this.enterpriseModel;
  }
  
  @inject()
  enterpriseModel: IEnterpriseModel;
}
