import { Application, Context } from 'midway';

/**
 * gql error 信息
 */
module.exports = (options: any, app: Application) => {
  return async function notFoundHandler(
    ctx: Context,
    next: () => Promise<void>
  ) {
    // console.log('中间件经过');
    await next();
    // console.log('中间件notFoundHandler错误拦截', ctx.status, ctx.request.url);
    if (ctx.method !== 'POST' || !ctx.url.includes('/graphql') || !ctx.body) {
      return;
    }
    const data = JSON.parse(ctx.body);
    const { errors } = data;
    if (!errors) {
      return;
    }
    ctx.logger.error(ctx.request.body);
    // 返回结果数据
    ctx.logger.error(ctx.body);
  };
};
