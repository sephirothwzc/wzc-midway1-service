import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IProjectGroupModel } from '../lib/models/project-group.model';

export interface IProjectGroupService extends ProjectGroupService {}

@provide()
export class ProjectGroupService extends ServiceBase {
  get Model(): any {
    return this.projectGroupModel;
  }
  
  @inject()
  projectGroupModel: IProjectGroupModel;
}
