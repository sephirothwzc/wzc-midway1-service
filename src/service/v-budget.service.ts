import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IVBudgetModel, VBudgetModel } from '../lib/models/v-budget.model';

export interface IVBudgetService extends VBudgetService {}

@provide()
export class VBudgetService extends ServiceGenericBase<VBudgetModel> {
  get Model(): any {
    return this.vBudgetModel;
  }

  @inject()
  vBudgetModel: IVBudgetModel;
}
