import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IProjectModel } from '../lib/models/project.model';

export interface IProjectService extends ProjectService {}

@provide()
export class ProjectService extends ServiceBase {
  get Model(): any {
    return this.projectModel;
  }
  
  @inject()
  projectModel: IProjectModel;
}
