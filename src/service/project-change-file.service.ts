import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IProjectChangeFileModel, ProjectChangeFileModel } from '../lib/models/project-change-file.model';
import { IProjectChangeService } from './project-change.service';
import { IProjectService } from './project.service';

export interface IProjectChangeFileService extends ProjectChangeFileService {}

@provide()
export class ProjectChangeFileService extends ServiceGenericBase<ProjectChangeFileModel> {
  get Model(): any {
    return this.projectChangeFileModel;
  }
  
  @inject()
  projectChangeFileModel: IProjectChangeFileModel;

  @inject()
  projectChangeService: IProjectChangeService;
  @inject()
  projectService: IProjectService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ProjectChangeFileModel, useOptions?: CreateOptions): Promise<ProjectChangeFileModel> {
    const run = async (t: Transaction) => {
      if (values.projectChangeIdObj && !values.projectChangeId) {
        values.projectChangeId = (
          await this.projectChangeService.create(values.projectChangeIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectIdObj && !values.projectId) {
        values.projectId = (
          await this.projectService.create(values.projectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      return super.create(values, {
        transaction: t,
      });
    };
    return await this.useTransaction(run, useOptions);
  }
  
}
