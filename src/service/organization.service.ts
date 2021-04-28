import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IOrganizationModel } from '../lib/models/organization.model';

export interface IOrganizationService extends OrganizationService {}

@provide()
export class OrganizationService extends ServiceBase {
  get Model(): any {
    return this.organizationModel;
  }
  
  @inject()
  organizationModel: IOrganizationModel;
}
