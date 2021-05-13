import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IProjectHisModel, ProjectHisModel } from '../lib/models/project-his.model';
import { IProjectService } from './project.service';
import { IProjectGroupService } from './project-group.service';
import { IDataDictionaryService } from './data-dictionary.service';
import { IOrganizationService } from './organization.service';
import { IAppUserService } from './app-user.service';

export interface IProjectHisService extends ProjectHisService {}

@provide()
export class ProjectHisService extends ServiceGenericBase<ProjectHisModel> {
  get Model(): any {
    return this.projectHisModel;
  }
  
  @inject()
  projectHisModel: IProjectHisModel;

  @inject()
  projectService: IProjectService;
  @inject()
  projectGroupService: IProjectGroupService;
  @inject()
  dataDictionaryService: IDataDictionaryService;
  @inject()
  organizationService: IOrganizationService;
  @inject()
  appUserService: IAppUserService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ProjectHisModel, useOptions?: CreateOptions): Promise<ProjectHisModel> {
    const run = async (t: Transaction) => {
      if (values.projectIdObj && !values.projectId) {
        values.projectId = (
          await this.projectService.create(values.projectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectGroupIdObj && !values.projectGroupId) {
        values.projectGroupId = (
          await this.projectGroupService.create(values.projectGroupIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectTypeIdObj && !values.projectTypeId) {
        values.projectTypeId = (
          await this.dataDictionaryService.create(values.projectTypeIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectSubjectIdObj && !values.projectSubjectId) {
        values.projectSubjectId = (
          await this.dataDictionaryService.create(values.projectSubjectIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.responsibleOrganizationIdObj && !values.responsibleOrganizationId) {
        values.responsibleOrganizationId = (
          await this.organizationService.create(values.responsibleOrganizationIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.projectStatusIdObj && !values.projectStatusId) {
        values.projectStatusId = (
          await this.dataDictionaryService.create(values.projectStatusIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.buildNatureIdObj && !values.buildNatureId) {
        values.buildNatureId = (
          await this.dataDictionaryService.create(values.buildNatureIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.addUserIdObj && !values.addUserId) {
        values.addUserId = (
          await this.appUserService.create(values.addUserIdObj, {
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
