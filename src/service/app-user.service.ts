import { provide, inject, Context } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { AppUserModel, IAppUserModel } from '../lib/models/app-user.model';
import * as crypto from 'crypto';
import { IAuthToken } from '../lib/utils/auth-token';

export interface IAppUserService extends AppUserService {}

@provide()
export class AppUserService extends ServiceBase {
  get Model(): any {
    return this.appUserModel;
  }

  @inject()
  appUserModel: IAppUserModel;

  @inject()
  authToken: IAuthToken;

  /**
   * 用户名密码登陆
   * @param param
   */
  async login(param: { userName: string; password: string }): Promise<any> {
    const user: AppUserModel = await this.appUserModel.findOne({
      where: { userName: param.userName },
    });
    if (!user) {
      return this.throw(
        `用户名密码错误${this.devShowError(JSON.stringify(param))}`,
        400
      );
    }
    // e10adc3949ba59abbe56e057f20f883e = 123456
    const hash = crypto.createHash('md5');
    hash.update(param.password);
    const newpwd = hash.digest('hex');
    const pwdbool = newpwd === user.password;
    const token = await this.authToken.sign({
      id: user.id,
      userName: user.userName,
      type: user.appUserType,
    });
    if (pwdbool) {
      return {
        id: user.id,
        token,
        userName: user.userName,
      };
    }
    return this.throw(
      `用户名或密码错误${this.devShowError(JSON.stringify(param))}`,
      400
    );
  }

  /**
   * 验证token
   */
  async signToken(ctx: Context): Promise<string> {
    await this.authToken.signToken(ctx);
    return this.auth.id;
  }
}
