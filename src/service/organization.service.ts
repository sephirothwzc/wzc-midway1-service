import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IOrganizationModel,
  OrganizationModel,
} from '../lib/models/organization.model';

export interface IOrganizationService extends OrganizationService {}

@provide()
export class OrganizationService extends ServiceGenericBase<OrganizationModel> {
  get Model(): any {
    return this.organizationModel;
  }

  @inject()
  organizationModel: IOrganizationModel;
}
