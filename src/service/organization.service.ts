import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IOrganizationModel, OrganizationModel } from '../lib/models/organization.model';
import { IOrganizationService } from './organization.service';

export interface IOrganizationService extends OrganizationService {}

@provide()
export class OrganizationService extends ServiceGenericBase<OrganizationModel> {
  get Model(): any {
    return this.organizationModel;
  }
  
  @inject()
  organizationModel: IOrganizationModel;

  @inject()
  organizationService: IOrganizationService;
  /**
   * 新增
   * @param values
   */
  public async create(values: OrganizationModel, useOptions?: CreateOptions): Promise<OrganizationModel> {
    const run = async (t: Transaction) => {
      if (values.parentIdObj && !values.parentId) {
        values.parentId = (
          await this.organizationService.create(values.parentIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      return super.create(values, {
        transaction: t,
      });
    };
    return await this.useTransaction(run, useOptions);
  }
  
}
