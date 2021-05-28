import { provide, inject } from 'midway';
import { CreateOptions, Op, Transaction } from 'sequelize';
import { ServiceGenericBase } from '../lib/base/service-generic.base';
import {
  IWorkFlowOrmModel,
  WorkFlowOrmModel,
  WORK_FLOW_ORM,
} from '../lib/models/work-flow-orm.model';
import { IWorkFlowService } from './work-flow.service';
import { IAppUserService } from './app-user.service';
import { SchemaOrmModel } from '../lib/models/schema-orm.model';
import { EFinishType, ISchemaOrm } from '../app/middleware/gql-work-flow';
import {
  IWorkFlowOrmUserModel,
  WorkFlowOrmUserModel,
  WORK_FLOW_ORM_USER,
} from '../lib/models/work-flow-orm-user.model';
import * as Bb from 'bluebird';
import { WorkFlowModel } from '../lib/models/work-flow.model';
import { get } from 'lodash';

export interface IWorkFlowOrmService extends WorkFlowOrmService {}

@provide()
export class WorkFlowOrmService extends ServiceGenericBase<WorkFlowOrmModel> {
  get Model(): any {
    return this.workFlowOrmModel;
  }

  @inject()
  workFlowOrmModel: IWorkFlowOrmModel;

  @inject()
  workFlowOrmUserModel: IWorkFlowOrmUserModel;

  @inject()
  workFlowService: IWorkFlowService;
  @inject()
  appUserService: IAppUserService;

  /**
   * 新增
   * @param values
   */
  public async create(
    values: WorkFlowOrmModel,
    useOptions?: CreateOptions
  ): Promise<WorkFlowOrmModel> {
    const run = async (t: Transaction) => {
      if (values.workFlowIdObj && !values.workFlowId) {
        values.workFlowId = (
          await this.workFlowService.create(values.workFlowIdObj, {
            transaction: t,
          })
        ).get('id');
      }
      if (values.createWorkIdObj && !values.createWorkId) {
        values.createWorkId = (
          await this.appUserService.create(values.createWorkIdObj, {
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

  /**
   * 关闭之前的记录 当前wfo 的 data status = 旧的 status value，如果多个处理则根据类型处理
   * @param schemaOrm 旧的记录
   * @returns
   */
  public async closeWorkFlowOrm(finishType: String, schemaOrm: ISchemaOrm) {
    const { one } = await Bb.props({
      upd: this.workFlowOrmUserModel.update(
        { statusValue: finishType },
        {
          where: {
            id: schemaOrm.workFlowOrmUserId,
          },
        }
      ),
      one: this.workFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.WORK_FLOW_ORM_ID]: schemaOrm.workFlowOrmId,
          [WORK_FLOW_ORM_USER.STATUS_VALUE]: {
            [Op.is]: null,
          },
          id: { [Op.not]: schemaOrm.workFlowOrmUserId },
        },
      }),
    });
    // 之前的记录处理状态 关闭
    // 判断 是否 所有的都关闭了
    !one &&
      (await this.workFlowOrmModel.update(
        { statusValue: finishType },
        { where: { id: schemaOrm.workFlowOrmId } }
      ));
  }

  /**
   * 驳回处理
   * @param schemaOrm
   * @param orm
   */
  public async reject(
    schemaOrm: ISchemaOrm,
    orm: SchemaOrmModel,
    workFlowModel: WorkFlowModel,
    finishType: string
  ) {
    // 起始节点必须有
    const cells = get(workFlowModel.graph, 'cells', []) as Array<any>;
    const startNode = cells.find((p) => 'startNode' === p?.data?.type);
    const result = await Bb.props({
      ormUser: this.workFlowOrmUserModel.update(
        {
          [WORK_FLOW_ORM_USER.STATUS_VALUE]: EFinishType.REJECT,
        },
        {
          where: {
            id: schemaOrm.workFlowOrmUserId,
          },
        }
      ),
      orm: this.workFlowOrmModel.update(
        {
          [WORK_FLOW_ORM.STATUS_VALUE]: EFinishType.REJECT,
        },
        {
          where: {
            id: schemaOrm.workFlowOrmId,
          },
        }
      ),
      newOrm: this.save({
        workFlowId: workFlowModel.get('id'),
        dataStatus: finishType,
        nodeId: startNode.id,
        ormId: orm.ormId,
        ormType: orm.ormType,
        createWorkId: this.auth.id,
        workFlowOrmUserWorkFlowOrmId: [
          {
            dataStatus: finishType,
            formUserId: this.auth.id,
          } as WorkFlowOrmUserModel,
        ],
      } as WorkFlowOrmModel),
    });
    return result;
  }

  /**
   * 提交节点
   * @param schemaOrm
   * @param orm
   * @param workFlowModel
   * @param finishType
   */
  public async finishNext(
    schemaOrm: ISchemaOrm,
    orm: SchemaOrmModel,
    workFlowModel: WorkFlowModel,
    finishType: string
  ) {
    await this.closeWorkFlowOrm(finishType, schemaOrm);
  }

  public async findNextNode(
    cells: Array<any>,
    startNode: any,
    variables: any,
    orm: SchemaOrmModel,
    workFlowModel: WorkFlowModel,
    finishType: string
  ) {
    // 起始节点的 下一级节点判断
    const nextCell: any = this.workFlowService.findNextNode(
      cells,
      startNode,
      variables,
      orm
    );
    if (nextCell.data.workUserId.length <= 0) {
      throw new Error('未配置审批人员');
    }
    const wfo = {
      workFlowId: workFlowModel.get('id'),
      dataStatus: get(nextCell, 'data.workType'),
      nodeId: nextCell.id,
      ormId: orm.ormId,
      ormType: orm.ormType,
      createWorkId: this.auth.id,
    } as WorkFlowOrmModel;

    wfo.workFlowOrmUserWorkFlowOrmId = nextCell.data.workUserId.map(
      (p: any) =>
        ({
          dataStatus: get(nextCell, 'data.workType'),
          formUserId: this.auth.id,
          managerUserType: nextCell.data.workUserType,
          managerUserId: p.id,
        } as WorkFlowOrmUserModel)
    );

    /**
     * 保存记录
     */
    await this.save(wfo);
  }
}
