import { inject, provide } from 'midway';
import { ServiceGenericBase } from '../../lib/base/service-generic.base';
import {
  ISchemaOrmModel,
  SchemaOrmModel,
} from '../../lib/models/schema-orm.model';
export interface ICustomSchemaOrmService extends CustomSchemaOrmService {}

@provide()
export class CustomSchemaOrmService extends ServiceGenericBase<SchemaOrmModel> {
  get Model(): any {
    return this.schemaOrmModel;
  }

  @inject()
  schemaOrmModel: ISchemaOrmModel;

  /**
   * 根据schemaorm 加载code、cellid => graph
   * @param model code 从对象取
   * @param cellid 节点id 为空则取起始节点
   */
  async workFlowGraph(model: SchemaOrmModel, cellid: String) {
    console.log(model);
    return '';
  }
}
