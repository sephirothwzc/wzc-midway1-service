import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IWorkFlowOrmModel } from '../lib/models/work-flow-orm.model';

export interface IWorkFlowOrmService extends WorkFlowOrmService {}

@provide()
export class WorkFlowOrmService extends ServiceBase {
  get Model(): any {
    return this.workFlowOrmModel;
  }
  
  @inject()
  workFlowOrmModel: IWorkFlowOrmModel;
}
