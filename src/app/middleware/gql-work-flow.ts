import { Application, Context } from 'midway';
import { ISchemaOrmService } from '../../service/schema-orm.service';
import { SchemaOrmModel } from '../../lib/models/schema-orm.model';
import { get } from 'lodash';
import { IWorkFlowService } from '../../service/custom/work-flow.service';
import { WorkFlowModel } from '../../lib/models/work-flow.model';
import { IWorkFlowOrmService } from '../../service/custom/work-flow-orm.service';
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
   * 审批流主表id
   */
  workFlowOrmId: string;
  /**
   * 当前工作流审批人id
   */
  workFlowOrmUserId: string;
  /**
   * 当前工作流id
   */
  workFlowId: string;
  /**
   * 创建人
   */
  createWorkId: string;
}

/**
 * 节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认
 */
export const enum EFinishType {
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

/**
 * 工作类型
 */
export enum EWorkType {
  /**
   * 审批（保存，通过、驳回）支持多人审批，1人 通过 or 驳回 next
   */
  approval = 'approval',
  /**
   * 传阅（保存，确定）支持多人传阅，全部点击确定后 next
   */
  circulated = 'circulated',
  /**
   * 会签（保存，通过、驳回）全部通过 next 1人 驳回 则 驳回
   */
  jointlySign = 'jointlySign',
  /**
   * 代办（确定）
   */
  agency = 'agency',
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
    // 判断当前工作流提交数据审批节点是否依然存在，如果不存在则只能报错打回
    await validateWorkFlow(ctx);

    await next();

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
  if (item) {
    return item;
  }
  const id = await schemaOrmService.save({
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
  // 查找工作流 始终寻找最新的表单工作流 如果 node不存在 则 报错如果version 不对 也报错
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
  if (
    !graphNodeId ||
    graphNodeId === 'undefined' ||
    finishType === EFinishType.SAVE
  ) {
    // 初始节点
    await firstFinish(wf, finishType, ctx, orm, schemaOrm);
  } else {
    // 历史节点
    await nextFinish(wf, finishType, ctx, orm, schemaOrm, graphNodeId);
  }
};

/**
 * 其他节点提交
 * @param workFlowModel
 * @param finishType
 * @param ctx
 * @param orm
 * @param schemaOrm
 */
const nextFinish = async (
  workFlowModel: WorkFlowModel,
  finishType: string,
  ctx: Context,
  orm: SchemaOrmModel,
  schemaOrm: ISchemaOrm,
  graphNodeId: string
) => {
  const workFlowOrmService: IWorkFlowOrmService =
    await ctx.requestContext.getAsync('workFlowOrmService');
  // 驳回
  if (finishType === EFinishType.REJECT) {
    const rejectRemark = decodeURIComponent(ctx.headers['reject-remark']);
    return await workFlowOrmService.reject(
      schemaOrm,
      orm,
      workFlowModel,
      finishType,
      rejectRemark
    );
  } else {
    const gqlBody: IGraphqlBody = ctx.request.body;
    return await workFlowOrmService.finishNext(
      schemaOrm,
      orm,
      workFlowModel,
      finishType,
      gqlBody.variables,
      graphNodeId
    );
  }
};

/**
 * 首次提交 保存、提交都走工作流
 */
const firstFinish = async (
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
    return await workFlowOrmService.save({
      workFlowId: workFlowModel.get('id'),
      dataStatus: finishType,
      nodeId: startNode.id,
      nodeText: startNode.attrs?.text?.textWrap?.text,
      ormId: orm.ormId,
      ormType: orm.ormType,
      createWorkId: auth.id,
      workFlowOrmUserWorkFlowOrmId: [
        {
          dataStatus: finishType,
          formUserId: auth.id,
        } as WorkFlowOrmUserModel,
      ],
    } as WorkFlowOrmModel);
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
      workFlowId: workFlowModel.get('id'),
      dataStatus: finishType,
      nodeId: nextCell.id,
      nodeText: nextCell.attrs?.text?.textWrap?.text,
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
    await workFlowOrmService.save(wfo);
    /**
     * 关闭工作流
     */
    schemaOrm.workFlowOrmUserId &&
      (await workFlowOrmService.closeWorkFlowOrm(finishType, schemaOrm));
  }
};

/**
 * 判断当前工作流提交数据审批节点是否依然存在，如果不存在则只能报错打回
 */
const validateWorkFlow = async (ctx: Context) => {
  const ormString = ctx.headers['schema-orm'];
  if (!ormString) {
    return;
  }
  const finishType = ctx.headers['finish-type'];
  const orm = JSON.parse(ormString) as ISchemaOrm;
  if (!orm.workFlowId) {
    return;
  }
  // 查找工作流
  const workFlowService: IWorkFlowService = await ctx.requestContext.getAsync(
    'workFlowService'
  );
  const wfItem = await workFlowService.findByPk(orm.workFlowId);
  if (finishType !== EFinishType.REJECT && !wfItem) {
    throw new Error('工作流不存在！请驳回！');
  }
  // 判断当前节点是否已经审批处理过 只能处理一次防止数据重复提交
  const workFlowOrmUserService: IWorkFlowService =
    await ctx.requestContext.getAsync('workFlowOrmUserService');
  const item = await workFlowOrmUserService.findByPk<WorkFlowOrmUserModel>(
    orm.workFlowOrmUserId
  );
  if (!item) {
    throw new Error('工作流节点不存在！请刷新后重试！');
  }
  if (item.get('statusValue')) {
    throw new Error('工作流节点已经审批，请勿重复操作！');
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
