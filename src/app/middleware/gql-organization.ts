import { Application, Context } from 'midway';
// import { gql } from 'graphql-tag';
// import { DocumentNode } from 'graphql';
import { get } from 'lodash';

interface IGraphqlBody {
  operationName: string;
  query: string;
  variables: any;
}

/**
 * gql 工作流处理
 */
module.exports = (options: any, app: Application) => {
  return async function gqlOrganization(
    ctx: Context,
    next: () => Promise<void>
  ) {
    if (
      ctx.method !== 'POST' ||
      !ctx.url.includes('/graphql') ||
      !ctx.request.body
    ) {
      return await next();
    }
    const gqlBody: IGraphqlBody = ctx.request.body;
    console.log(gqlBody);

    // 获取当前用户科室
    const auth = await ctx.requestContext.getAsync('Auth');
    if (get(auth, 'department')) {
      // 包含科室 判断数据写入科室
    }
    // console.log('中间件经过');
    await next();
    // console.log('中间件notFoundHandler错误拦截', ctx.status, ctx.request.url);
  };
};
