import { provide, Context, inject, controller, post, get } from 'midway';
import { IAppUserService } from '../../service/app-user.service';

@provide()
@controller('/api/app-user')
export class AppUserController {
  @inject()
  ctx: Context;

  @inject()
  private appUserService: IAppUserService;

  @post('/login')
  async login() {
    this.ctx.body = await this.appUserService.login(this.ctx.request.body);
  }

  @get('/')
  async signToken() {
    this.ctx.body = await this.appUserService.signToken(this.ctx);
  }
}
