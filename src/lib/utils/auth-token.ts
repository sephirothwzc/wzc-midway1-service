import { provide, Context, plugin, config } from 'midway';
import { promisify } from 'util';
import { IAuth } from '../interfaces/auth.interface';

export interface IAuthToken extends AuthToken {}

@provide()
export class AuthToken {
  @plugin()
  private jwt: any;

  @config('jwt')
  private configJwt: any;

  /**
   * token校验
   * @param ctx
   */
  async signToken(ctx: Context) {
    const { token } = ctx.request.header;
    if (token) {
      await this.validateToken(token, ctx);
    } else {
      return ctx.throw(401, '请登陆后操作');
    }
  }

  /**
   * 下发令牌
   * @param param
   */
  async sign(param: { id: string; userName: string; type: any; exp?: number }) {
    param.exp || (param.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60); // 60 seconds * 60 minutes = 1 hour
    return this.jwt.sign(param, this.configJwt.secret);
  }

  private async validateToken(token: String, ctx: Context) {
    const jwtVerify = promisify(this.jwt.verify);
    await jwtVerify(token, this.configJwt.secret)
      .then(async (decoded: any) => {
        const auth: IAuth = await ctx.requestContext.getAsync('Auth');
        auth.id = decoded.id;
        auth.userName = decoded.userName;
        auth.exp = decoded.exp;
        auth.type = decoded.type;
        return;
      })
      .catch(() => {
        return ctx.throw(403, '非法用户');
      });
  }
}
