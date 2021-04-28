import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IProjectHisModel } from '../lib/models/project-his.model';

export interface IProjectHisService extends ProjectHisService {}

@provide()
export class ProjectHisService extends ServiceBase {
  get Model(): any {
    return this.projectHisModel;
  }
  
  @inject()
  projectHisModel: IProjectHisModel;
}
