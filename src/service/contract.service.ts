import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractModel, ContractModel } from '../lib/models/contract.model';
import { IProjectService } from './project.service';
import { IBudgetService } from './budget.service';
import { IDataDictionaryService } from './data-dictionary.service';
import { IAppUserService } from './app-user.service';
import { IOrganizationService } from './organization.service';

export interface IContractService extends ContractService {}

@provide()
export class ContractService extends ServiceGenericBase<ContractModel> {
  get Model(): any {
    return this.contractModel;
  }
  
  @inject()
  contractModel: IContractModel;

  @inject()
  projectService: IProjectService;
  @inject()
  budgetService: IBudgetService;
  @inject()
  dataDictionaryService: IDataDictionaryService;
  @inject()
  appUserService: IAppUserService;
  @inject()
  organizationService: IOrganizationService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractModel, useOptions?: CreateOptions): Promise<ContractModel> {
    const run = async (t: Transaction) => {
      if (values.projectIdObj && !values.projectId) {
        values.projectId = (
          await this.projectService.create(values.projectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.budgetIdObj && !values.budgetId) {
        values.budgetId = (
          await this.budgetService.create(values.budgetIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.contractTypeIdObj && !values.contractTypeId) {
        values.contractTypeId = (
          await this.dataDictionaryService.create(values.contractTypeIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.contractStatusIdObj && !values.contractStatusId) {
        values.contractStatusId = (
          await this.dataDictionaryService.create(values.contractStatusIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.contractNatureIdObj && !values.contractNatureId) {
        values.contractNatureId = (
          await this.dataDictionaryService.create(values.contractNatureIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.addUserIdObj && !values.addUserId) {
        values.addUserId = (
          await this.appUserService.create(values.addUserIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.organizationIdObj && !values.organizationId) {
        values.organizationId = (
          await this.organizationService.create(values.organizationIdObj, {
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
