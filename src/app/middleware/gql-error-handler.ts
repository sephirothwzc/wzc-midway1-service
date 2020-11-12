import { Application, Context } from 'midway';

module.exports = (options: any, app: Application) => {
  return async function notFoundHandler(
    ctx: Context,
    next: () => Promise<void>
  ) {
    // console.log('中间件经过');
    await next();
    // console.log('中间件notFoundHandler错误拦截', ctx.status, ctx.request.url);
    if (ctx.url !== '/graphql?' || !ctx.body) {
      return;
    }
    const data = JSON.parse(ctx.body);
    const { errors } = data;
    if (!errors) {
      return;
    }
    ctx.logger.info(ctx.body);
    // 输出日志
    ctx.logger.error(ctx.body);
  };
};
