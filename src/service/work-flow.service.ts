import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IWorkFlowModel } from '../lib/models/work-flow.model';

export interface IWorkFlowService extends WorkFlowService {}

@provide()
export class WorkFlowService extends ServiceBase {
  get Model(): any {
    return this.workFlowModel;
  }
  
  @inject()
  workFlowModel: IWorkFlowModel;
}
