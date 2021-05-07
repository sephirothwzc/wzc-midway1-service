import { Application, Context } from 'midway';
// import { gql } from 'graphql-tag';
// import { DocumentNode } from 'graphql';
import { ISchemaOrmService } from '../../service/schema-orm.service';
import { SchemaOrmModel } from '../../lib/models/schema-orm.model';
import { get } from 'lodash';
import { IWorkFlowService } from '../../service/work-flow.service';

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
    const orm = JSON.parse(ormString);
    await schemaOrmSave(orm, ctx);

    // 提交类型 工作流用
    const finishType = ctx.headers['finish-type'];
    if (finishType) {
      await handleWorkFlowOrm(orm, ctx);
    }
  };
};

/**
 * 保存orm对象
 * @param app
 * @param orm
 */
const schemaOrmSave = async (orm: SchemaOrmModel, ctx: Context) => {
  const gqlBody: IGraphqlBody = ctx.request.body;
  const result = JSON.parse(ctx.body);
  orm.ormType = gqlBody.operationName;
  orm.ormId = get(result, `data.${gqlBody.operationName}`);
  // 保存表单id与schemaId
  const schemaOrmService: ISchemaOrmService = await ctx.requestContext.getAsync(
    'schemaOrmService'
  );
  const item = await schemaOrmService.findOne<SchemaOrmModel>({
    where: {
      ormId: orm.ormId,
      ormType: gqlBody.operationName,
    },
  });
  return await schemaOrmService.save({ ...(item || {}), ...orm } as any);
};

/**
 * 工作流事件
 * @param app
 */
const handleWorkFlowOrm = async (orm: SchemaOrmModel, ctx: Context) => {
  const appName = ctx.headers['app-name'];
  // 查找工作流
  const workFlowService: IWorkFlowService = await ctx.requestContext.getAsync(
    'workFlowService'
  );
  const wf = await workFlowService.findOne({
    where: {
      appName,
      formCustomId: orm.formCustomId,
    },
    order: [['id', 'DESC']],
  });
  if (!wf) {
    return;
  }
  // 有工作流 插入工作流数据表
  // 节点判断
};
