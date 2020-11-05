import { Application, Context } from 'midway';
import { IAuthToken } from '../../lib/utils/auth-token';

/*
 * @Author: zhanchao.wu
 * @Date: 2020-09-08 13:43:57
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-11-05 11:18:45
 */
module.exports = (options: any, app: Application) => {
  return async function validator(ctx: Context, next: any) {
    const authToken: IAuthToken = await ctx.requestContext.getAsync(
      `authToken`
    );
    await authToken.signToken(ctx);
    await next();
  };
};
