import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IProjectFileModel, ProjectFileModel } from '../lib/models/project-file.model';
import { IProjectService } from './project.service';

export interface IProjectFileService extends ProjectFileService {}

@provide()
export class ProjectFileService extends ServiceGenericBase<ProjectFileModel> {
  get Model(): any {
    return this.projectFileModel;
  }
  
  @inject()
  projectFileModel: IProjectFileModel;

  @inject()
  projectService: IProjectService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ProjectFileModel, useOptions?: CreateOptions): Promise<ProjectFileModel> {
    const run = async (t: Transaction) => {
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
