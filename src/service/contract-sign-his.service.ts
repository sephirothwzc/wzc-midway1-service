import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractSignHisModel, ContractSignHisModel } from '../lib/models/contract-sign-his.model';
import { IContractSignService } from './contract-sign.service';
import { IContractService } from './contract.service';
import { IEnterpriseService } from './enterprise.service';

export interface IContractSignHisService extends ContractSignHisService {}

@provide()
export class ContractSignHisService extends ServiceGenericBase<ContractSignHisModel> {
  get Model(): any {
    return this.contractSignHisModel;
  }
  
  @inject()
  contractSignHisModel: IContractSignHisModel;

  @inject()
  contractSignService: IContractSignService;
  @inject()
  contractService: IContractService;
  @inject()
  enterpriseService: IEnterpriseService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractSignHisModel, useOptions?: CreateOptions): Promise<ContractSignHisModel> {
    const run = async (t: Transaction) => {
      if (values.contractSignIdObj && !values.contractSignId) {
        values.contractSignId = (
          await this.contractSignService.create(values.contractSignIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.contractIdObj && !values.contractId) {
        values.contractId = (
          await this.contractService.create(values.contractIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.enterpriseIdObj && !values.enterpriseId) {
        values.enterpriseId = (
          await this.enterpriseService.create(values.enterpriseIdObj, {
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
