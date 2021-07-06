import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IProjectChangeModel, ProjectChangeModel } from '../lib/models/project-change.model';
import { IProjectService } from './project.service';
import { IProjectHisService } from './project-his.service';

export interface IProjectChangeService extends ProjectChangeService {}

@provide()
export class ProjectChangeService extends ServiceGenericBase<ProjectChangeModel> {
  get Model(): any {
    return this.projectChangeModel;
  }
  
  @inject()
  projectChangeModel: IProjectChangeModel;

  @inject()
  projectService: IProjectService;
  @inject()
  projectHisService: IProjectHisService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ProjectChangeModel, useOptions?: CreateOptions): Promise<ProjectChangeModel> {
    const run = async (t: Transaction) => {
      if (values.projectIdObj && !values.projectId) {
        values.projectId = (
          await this.projectService.create(values.projectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectHisIdObj && !values.projectHisId) {
        values.projectHisId = (
          await this.projectHisService.create(values.projectHisIdObj, {
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
