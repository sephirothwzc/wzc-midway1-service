import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IContractHisModel,
  ContractHisModel,
} from '../lib/models/contract-his.model';
import { IContractService } from './contract.service';
import { IProjectService } from './project.service';
import { IBudgetService } from './budget.service';
import { IDataDictionaryService } from './data-dictionary.service';
import { IAppUserService } from './app-user.service';
import { IOrganizationService } from './organization.service';

export interface IContractHisService extends ContractHisService {}

@provide()
export class ContractHisService extends ServiceGenericBase<ContractHisModel> {
  get Model(): any {
    return this.contractHisModel;
  }

  @inject()
  contractHisModel: IContractHisModel;

  @inject()
  contractService: IContractService;
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
  public async create(
    values: ContractHisModel,
    useOptions?: CreateOptions
  ): Promise<ContractHisModel> {
    const run = async (t: Transaction) => {
      if (values.contractIdObj && !values.contractId) {
        values.contractId = (
          await this.contractService.create(values.contractIdObj, {
            transaction: t,
          })
        ).get('id');
      }
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
