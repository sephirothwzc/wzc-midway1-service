import { set } from 'lodash';
import { provide, Context, config, inject, plugin } from 'midway';
import { promisify } from 'util';
import { IAuth } from '../interfaces/auth.interface';

export interface IAuthToken extends AuthToken {}

@provide()
export class AuthToken {
  @inject()
  ctx: Context;

  @plugin()
  private jwt: any;

  @config('jwt')
  private configJwt: any;

  /**
   * 下发令牌
   * @param param
   */
  async sign(
    param: {
      id: string;
      userName: string;
      exp?: number | string;
      [key: string]: any;
    },
    options?: { expiresIn?: any }
  ) {
    if (!options?.expiresIn && !param?.exp) {
      param.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    }
    return this.jwt.sign(param, this.configJwt.secret, options);
  }

  /**
   * token校验
   */
  async signToken() {
    const { token } = this.ctx.request.header;
    if (!token) {
      return this.ctx.throw(401, '请登陆后操作');
    }
    return this.signByToken(token);
  }

  async signByToken(token: string) {
    const jwtVerify = promisify(this.jwt.verify);
    await jwtVerify(token, this.configJwt.secret)
      .then(async (decoded: any) => {
        const auth: IAuth = await this.ctx.requestContext.getAsync('Auth');
        auth.token = token;
        // copy赋值 为了适配otherKey
        for (const [k, v] of Object.entries(decoded)) {
          set(auth, k, v);
        }
        return;
      })
      .catch(() => {
        return this.ctx.throw(403, '非法用户');
      });
  }
}
