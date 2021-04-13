/*
 * @Author: 吴占超
 * @Date: 2019-08-09 10:24:11
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-10-22 14:32:28
 */
import { provide, Context, get, controller } from 'midway';

@provide()
@controller('/')
export class HomeController {
  @get('/*')
  async view(ctx: Context) {
    await ctx.render('index');
  }

  @get('/web/*')
  async webView(ctx: Context) {
    await ctx.render('index');
  }
}
