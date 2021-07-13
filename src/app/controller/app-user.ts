import { provide, Context, inject, controller, post, get, del } from 'midway';
import { IAppUserService } from '../../service/custom/app-user.service';

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

  @get('/code2session')
  async code2session() {
    this.ctx.body = await this.appUserService.code2session(this.ctx.query);
  }

  @post('/register')
  async register() {
    this.ctx.body = await this.appUserService.register(this.ctx.request.body);
  }

  @post('/data-decoded')
  async dataDecoded() {
    this.ctx.body = await this.appUserService.dataDecoded(
      this.ctx.request.body
    );
  }

  /**
   * 根据手机号返回token
   */
  @get('/test-api')
  async testApi() {
    if (process.env.NODE_ENV !== 'local') {
      return 'testApi';
    }
    this.ctx.body = await this.appUserService.tokenDevelop(
      this.ctx.query.phone
    );
  }

  @post('/find-one')
  async findOne() {
    this.ctx.body = await this.appUserService.findOne(this.ctx.request.body);
  }

  @post('/find-all')
  async findAll() {
    this.ctx.body = await this.appUserService.findAll(this.ctx.request.body);
  }

  @post('/find-count')
  async findCount() {
    this.ctx.body = await this.appUserService.findCount(this.ctx.request.body);
  }

  @post('/save')
  async save() {
    this.ctx.body = await this.appUserService.save(this.ctx.request.body);
  }

  @post('/bulk-create')
  async bulkCreate() {
    this.ctx.body = await this.appUserService.bulkCreate(this.ctx.request.body);
  }

  @get('/:id')
  async findByPk() {
    this.ctx.body = await this.appUserService.findByPk(this.ctx.params.id);
  }

  @get('/')
  async signToken() {
    this.ctx.body = await this.appUserService.signToken(this.ctx);
  }

  @del('/')
  async destroy() {
    this.ctx.body = await this.appUserService.destroy(
      this.ctx.request.body?.where,
      this.ctx.request.body?.limit,
      this.ctx.request.body?.force
    );
  }
}
