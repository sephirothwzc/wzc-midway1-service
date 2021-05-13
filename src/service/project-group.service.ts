import { provide, inject } from 'midway';
// import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IProjectGroupModel,
  ProjectGroupModel,
} from '../lib/models/project-group.model';

export interface IProjectGroupService extends ProjectGroupService {}

@provide()
export class ProjectGroupService extends ServiceGenericBase<ProjectGroupModel> {
  get Model(): any {
    return this.projectGroupModel;
  }

  @inject()
  projectGroupModel: IProjectGroupModel;
}
