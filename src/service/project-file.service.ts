import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IProjectFileModel } from '../lib/models/project-file.model';

export interface IProjectFileService extends ProjectFileService {}

@provide()
export class ProjectFileService extends ServiceBase {
  get Model(): any {
    return this.projectFileModel;
  }
  
  @inject()
  projectFileModel: IProjectFileModel;
}
