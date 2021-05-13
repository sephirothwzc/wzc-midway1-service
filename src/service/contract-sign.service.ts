import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IContractSignModel, ContractSignModel } from '../lib/models/contract-sign.model';
import { IContractService } from './contract.service';
import { IEnterpriseService } from './enterprise.service';

export interface IContractSignService extends ContractSignService {}

@provide()
export class ContractSignService extends ServiceGenericBase<ContractSignModel> {
  get Model(): any {
    return this.contractSignModel;
  }
  
  @inject()
  contractSignModel: IContractSignModel;

  @inject()
  contractService: IContractService;
  @inject()
  enterpriseService: IEnterpriseService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ContractSignModel, useOptions?: CreateOptions): Promise<ContractSignModel> {
    const run = async (t: Transaction) => {
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
