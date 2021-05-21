import { Application, Context } from 'midway';
// import { gql } from 'graphql-tag';
// import { DocumentNode } from 'graphql';
import { ISchemaOrmService } from '../../service/schema-orm.service';
import { SchemaOrmModel } from '../../lib/models/schema-orm.model';
import { get } from 'lodash';
import { IWorkFlowService } from '../../service/work-flow.service';
import { WorkFlowModel } from '../../lib/models/work-flow.model';
import { IWorkFlowOrmService } from '../../service/work-flow-orm.service';
import { WorkFlowOrmModel } from '../../lib/models/work-flow-orm.model';
import { IAuth } from '../../lib/interfaces/auth.interface';
import { WorkFlowOrmUserModel } from '../../lib/models/work-flow-orm-user.model';

export interface ISchemaOrm {
  /**
   * 动态表单id
   */
  formCustomId: string;
  /**
   * 动态表单设计id
   */
  formCustomSchemaId: string;
  /**
   * 当前工作流id
   */
  workFlowOrmId: string;
}

/**
 * 节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认
 */
const enum EFinishType {
  /**
   * 保存
   */
  SAVE = 'save',
  /**
   * 提交
   */
  FINISH = 'finish',
  /**
   * 驳回
   */
  REJECT = 'reject',
  /**
   * 确认
   */
  CONFIRM = 'confirm',
}

interface IGraphqlBody {
  operationName: string;
  query: string;
  variables: any;
}

/**
 * gql 工作流处理
 */
module.exports = (options: any, app: Application) => {
  return async function gqlWorkFlow(ctx: Context, next: () => Promise<void>) {
    // console.log('中间件经过');
    await next();
    // console.log('中间件notFoundHandler错误拦截', ctx.status, ctx.request.url);
    if (ctx.method !== 'POST' || !ctx.url.includes('/graphql') || !ctx.body) {
      return;
    }
    const { errors } = JSON.parse(ctx.body);
    if (errors) {
      return; // 错误则退出
    }

    // 动态表单 表单数据用
    const ormString = ctx.headers['schema-orm'];
    if (!ormString) {
      return;
    }
    const orm = JSON.parse(ormString) as ISchemaOrm;
    const schemaOrmModel = await schemaOrmSave(orm, ctx);

    // 提交类型 工作流用
    const finishType = ctx.headers['finish-type'];
    if (finishType) {
      await handleWorkFlowOrm(schemaOrmModel, ctx, finishType, orm);
    }
  };
};

/**
 * 保存orm对象
 * @param app
 * @param orm
 */
const schemaOrmSave = async (orm: ISchemaOrm, ctx: Context) => {
  const gqlBody: IGraphqlBody = ctx.request.body;
  const result = JSON.parse(ctx.body);
  const schemaOrm = {
    formCustomId: orm.formCustomId,
    formCustomSchemaId: orm.formCustomSchemaId,
  } as SchemaOrmModel;
  schemaOrm.ormType = gqlBody.operationName;
  schemaOrm.ormId = get(result, `data.${gqlBody.operationName}`);
  // 保存表单id与schemaId
  const schemaOrmService: ISchemaOrmService = await ctx.requestContext.getAsync(
    'schemaOrmService'
  );
  const item = await schemaOrmService.findOne<SchemaOrmModel>({
    where: {
      ormId: schemaOrm.ormId,
      ormType: gqlBody.operationName,
    },
  });
  const id = await schemaOrmService.save({
    ...(item || {}),
    ...schemaOrm,
  } as any);
  schemaOrm.id = id;
  return schemaOrm;
};

/**
 * 工作流事件
 * @param app
 */
const handleWorkFlowOrm = async (
  orm: SchemaOrmModel,
  ctx: Context,
  finishType: string,
  schemaOrm: ISchemaOrm
) => {
  const appName = ctx.headers['app-name'];
  // 查找工作流
  const workFlowService: IWorkFlowService = await ctx.requestContext.getAsync(
    'workFlowService'
  );
  const wf = await workFlowService.findOne<WorkFlowModel>({
    where: {
      appName,
      formCustomId: orm.formCustomId,
    },
    order: [['id', 'DESC']],
  });
  if (!wf) {
    return;
  }
  // nodeid 节点位置
  const graphNodeId = ctx.headers['graph-node-id'];
  // 有工作流 插入工作流数据表
  // 节点判断
  if (!graphNodeId) {
    // 初始节点
    await firstFinisth(wf, finishType, ctx, orm, schemaOrm);
  } else {
    // 历史节点
  }
};

/**
 * 首次提交 保存、提交都走工作流
 */
const firstFinisth = async (
  workFlowModel: WorkFlowModel,
  finishType: string,
  ctx: Context,
  orm: SchemaOrmModel,
  schemaOrm: ISchemaOrm
) => {
  const gqlBody: IGraphqlBody = ctx.request.body;
  const workFlowOrmService: IWorkFlowOrmService =
    await ctx.requestContext.getAsync('workFlowOrmService');
  const workFlowService: IWorkFlowService = await ctx.requestContext.getAsync(
    'workFlowService'
  );
  // 获取当前用户
  const auth: IAuth = await ctx.requestContext.getAsync('Auth');
  const cells = get(workFlowModel.graph, 'cells', []) as Array<any>;
  // 起始节点必须有
  const startNode = cells.find((p) => 'startNode' === p?.data?.type);
  // 首次更新 草稿
  if (finishType === EFinishType.SAVE && !get(gqlBody.variables, 'param.id')) {
    const wf = {
      dataStatus: finishType,
      nodeId: startNode.id,
      ormId: orm.ormId,
      ormType: orm.ormType,
      createWorkId: auth.id,
      workFlowOrmUserWorkFlowOrmId: [
        {
          dataStatus: finishType,
          formUserId: auth.id,
        } as WorkFlowOrmUserModel,
      ],
    } as WorkFlowOrmModel;
    workFlowOrmService.save(wf);
  } else if (finishType === EFinishType.FINISH) {
    // 起始节点的 下一级节点判断
    const nextCell: any = workFlowService.findNextNode(
      cells,
      startNode,
      gqlBody.variables,
      orm
    );
    if (nextCell.data.workUserId.length <= 0) {
      throw new Error('未配置审批人员');
    }
    const wfo = {
      dataStatus: finishType,
      nodeId: nextCell.id,
      ormId: orm.ormId,
      ormType: orm.ormType,
      createWorkId: auth.id,
    } as WorkFlowOrmModel;

    wfo.workFlowOrmUserWorkFlowOrmId = nextCell.data.workUserId.map(
      (p: any) =>
        ({
          dataStatus: finishType,
          formUserId: auth.id,
          managerUserType: nextCell.data.workType,
          managerUserId: p.id,
        } as WorkFlowOrmUserModel)
    );

    /**
     * 保存提交记录
     */
    workFlowOrmService.save(wfo);
    /**
     * 关闭工作流
     */
    workFlowOrmService.closeWorkFlowOrm(orm, wfo, schemaOrm);
  }
};

/**
 * 首次提交 保存 工作流记录 用于列表查询 （草稿、提交）
 * 编辑 保存 不更新状态，其他操作 提交、审批通过、审批拒绝 则判断工作流
 * 最终节点 更新状态 工作流结束
 * 发起人=》承办人
 * 区分状态、会签、传阅
 * 时间有效性提醒
 */
