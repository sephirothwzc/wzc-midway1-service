import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { ISchemaOrmModel, SchemaOrmModel } from '../lib/models/schema-orm.model';
import { IFormCustomService } from './form-custom.service';
import { IFormCustomSchemaService } from './form-custom-schema.service';

export interface ISchemaOrmService extends SchemaOrmService {}

@provide()
export class SchemaOrmService extends ServiceGenericBase<SchemaOrmModel> {
  get Model(): any {
    return this.schemaOrmModel;
  }
  
  @inject()
  schemaOrmModel: ISchemaOrmModel;

  @inject()
  formCustomService: IFormCustomService;
  @inject()
  formCustomSchemaService: IFormCustomSchemaService;
  /**
   * 新增
   * @param values
   */
  public async create(values: SchemaOrmModel, useOptions?: CreateOptions): Promise<SchemaOrmModel> {
    const run = async (t: Transaction) => {
      if (values.formCustomIdObj && !values.formCustomId) {
        values.formCustomId = (
          await this.formCustomService.create(values.formCustomIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.formCustomSchemaIdObj && !values.formCustomSchemaId) {
        values.formCustomSchemaId = (
          await this.formCustomSchemaService.create(values.formCustomSchemaIdObj, {
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
