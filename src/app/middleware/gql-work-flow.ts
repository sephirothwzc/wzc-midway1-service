import { Application, Context } from 'midway';
import { gql } from 'graphql-tag';
import { DocumentNode } from 'graphql';

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
    const gqlBody: IGraphqlBody = ctx.request.body;
    const document: DocumentNode = gql(gqlBody.query);
    console.log(document);
    console.log(gqlBody.operationName);
  };
};
