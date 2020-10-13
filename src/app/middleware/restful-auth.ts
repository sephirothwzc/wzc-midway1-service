import { Application, Context } from 'midway';

/*
 * @Author: zhanchao.wu
 * @Date: 2020-09-08 13:43:57
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-10-10 15:40:40
 */
module.exports = (options: any, app: Application) => {
  return async function validator(ctx: Context, next: any) {
    const authToken = await ctx.requestContext.getAsync(`authToken`);
    await authToken.signToken(ctx);
    await next();
  };
};
