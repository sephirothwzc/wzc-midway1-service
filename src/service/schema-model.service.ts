import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  ISchemaModelModel,
  SchemaModelModel,
} from '../lib/models/schema-model.model';

export interface ISchemaModelService extends SchemaModelService {}

@provide()
export class SchemaModelService extends ServiceGenericBase<SchemaModelModel> {
  get Model(): any {
    return this.schemaModelModel;
  }

  @inject()
  schemaModelModel: ISchemaModelModel;

  @inject()
  schemaModelService: ISchemaModelService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: SchemaModelModel,
    useOptions?: CreateOptions
  ): Promise<SchemaModelModel> {
    const run = async (t: Transaction) => {
      if (values.parentIdObj && !values.parentId) {
        values.parentId = (
          await this.schemaModelService.create(values.parentIdObj, {
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
