import { inject, provide } from 'midway';
import { ServiceGenericBase } from '../../lib/base/service-generic.base';
import {
  ISchemaOrmModel,
  SchemaOrmModel,
} from '../../lib/models/schema-orm.model';
import { IWorkFlowModel, WORK_FLOW } from '../../lib/models/work-flow.model';
import { get } from 'lodash';

export interface ICustomSchemaOrmService extends CustomSchemaOrmService {}

@provide()
export class CustomSchemaOrmService extends ServiceGenericBase<SchemaOrmModel> {
  get Model(): any {
    return this.schemaOrmModel;
  }

  @inject()
  schemaOrmModel: ISchemaOrmModel;

  @inject()
  workFlowModel: IWorkFlowModel;

  /**
   * 根据schemaorm 加载code、cellid => graph 首节点
   * @param model code 从对象取
   */
  async workFlowGraph(model: SchemaOrmModel) {
    // 根据 form_custom_id 获取工作流 graphql
    const wf = await this.workFlowModel.findOne({
      where: {
        [WORK_FLOW.FORM_CUSTOM_ID]: model.get('formCustomId'),
      },
      order: [[WORK_FLOW.VERSION, 'DESC']],
    });
    const { cells } = wf.get('graph') as any;
    const dataNode = cells.find(
      (p: any) => get(p, 'data.type') === 'startNode'
    );
    return {
      graphString: get(dataNode, 'data.formAuthSchema'),
      cellNodeId: get(dataNode, 'id'),
    };
  }
}
