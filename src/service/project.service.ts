import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { IProjectModel, ProjectModel } from '../lib/models/project.model';
import { IProjectGroupService } from './project-group.service';
import { IDataDictionaryService } from './data-dictionary.service';
import { IOrganizationService } from './organization.service';
import { IAppUserService } from './app-user.service';
import { IFormCustomSchemaService } from './form-custom-schema.service';

export interface IProjectService extends ProjectService {}

@provide()
export class ProjectService extends ServiceGenericBase<ProjectModel> {
  get Model(): any {
    return this.projectModel;
  }
  
  @inject()
  projectModel: IProjectModel;

  @inject()
  projectGroupService: IProjectGroupService;
  @inject()
  dataDictionaryService: IDataDictionaryService;
  @inject()
  organizationService: IOrganizationService;
  @inject()
  appUserService: IAppUserService;
  @inject()
  formCustomSchemaService: IFormCustomSchemaService;
  /**
   * 新增
   * @param values
   */
  public async create(values: ProjectModel, useOptions?: CreateOptions): Promise<ProjectModel> {
    const run = async (t: Transaction) => {
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
      if (values.schemaIdObj && !values.schemaId) {
        values.schemaId = (
          await this.formCustomSchemaService.create(values.schemaIdObj, {
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
