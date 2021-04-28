import { provide, inject } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { IProjectFileHisModel } from '../lib/models/project-file-his.model';

export interface IProjectFileHisService extends ProjectFileHisService {}

@provide()
export class ProjectFileHisService extends ServiceBase {
  get Model(): any {
    return this.projectFileHisModel;
  }
  
  @inject()
  projectFileHisModel: IProjectFileHisModel;
}
