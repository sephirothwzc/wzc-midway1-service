import { provide, inject } from 'midway';
import { CreateOptions, Transaction } from 'sequelize/types';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import { SchemaOrmModel } from '../lib/models/schema-orm.model';
import { IWorkFlowModel, WorkFlowModel } from '../lib/models/work-flow.model';
import { IFormCustomService } from './form-custom.service';
import { get } from 'lodash';

export interface IWorkFlowService extends WorkFlowService {}

@provide()
export class WorkFlowService extends ServiceGenericBase<WorkFlowModel> {
  get Model(): any {
    return this.workFlowModel;
  }

  @inject()
  workFlowModel: IWorkFlowModel;

  @inject()
  formCustomService: IFormCustomService;
  /**
   * 新增
   * @param values
   */
  public async create(
    values: WorkFlowModel,
    useOptions?: CreateOptions
  ): Promise<WorkFlowModel> {
    const run = async (t: Transaction) => {
      if (values.formCustomIdObj && !values.formCustomId) {
        values.formCustomId = (
          await this.formCustomService.create(values.formCustomIdObj, {
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

  private findConditio(txt: String): (model: any) => boolean {
    return eval(`function conditioBool(model){
      ${txt}
    }`);
  }

  /**
   * 获取下一节点
   * @param cells
   * @param thisNode
   * @param param
   * @param orm
   */
  public findNextNode(
    cells: Array<any>,
    thisNode: any,
    variables: any,
    orm: SchemaOrmModel
  ) {
    // 线
    const edges = cells.filter((p) => {
      return thisNode.id === get(p, 'source.cell');
    });
    // 只有一条线则返回下一节点
    if (edges.length === 1) {
      const nodes = cells.filter((p: any) => {
        return p.id === get(edges[0], 'target.cell');
      });
      const node = get(nodes, '[0]');
      // 非判断节点
      if (get(node, 'data.type') !== 'decisionNode') {
        return node;
      } else {
        // 判断节点直接找寻edge线
        return this.findNextNode(cells, node, variables, orm);
      }
    }
    // 连接线 判断是否有条件 如果有 进行匹配
    const edge = edges.find((p: any) => {
      // 存在判断条件
      if (p?.data?.conditio) {
        const fun = this.findConditio(p?.data?.conditio);
        return fun(variables.param);
      }
      return false;
    });
    if (edge.length === 0) {
      throw new Error('工作流未匹配到审批节点！');
    }
    return cells.find((p: any) => p.id === get(edge, '[0].source.port'));
  }
}
