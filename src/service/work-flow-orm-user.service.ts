import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IWorkFlowOrmUserModel } from '../lib/models/work-flow-orm-user.model';

export interface IWorkFlowOrmUserService extends WorkFlowOrmUserService {}

@provide()
export class WorkFlowOrmUserService extends ServiceBase {
  get Model(): any {
    return this.workFlowOrmUserModel;
  }
  
  @inject()
  workFlowOrmUserModel: IWorkFlowOrmUserModel;
}
