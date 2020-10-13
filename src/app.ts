/*
 * @Author: 吴占超
 * @Date: 2019-05-25 09:56:11
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-10-12 21:19:07
 */
import { Application } from 'midway-web';
import * as _ from 'lodash';
import { IDBContext } from './lib/models/db';
import loadJoi from './lib/use-plugin/load-joi';
// import { DB } from './lib/models/db';

class AppBootHook {
  constructor(app: Application) {
    this.app = app;
  }
  private app: Application;

  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
    // mongoose 暂时不用了 src/app/model
    // const models = _.get(this.app, 'model');
    // _.keys(models).forEach((p: string) => {
    //   this.app.applicationContext.registerObject(
    //     `${_.camelCase(p)}Model`,
    //     models[p]
    //   );
    // });
    // #region schema load
    loadJoi(this.app);
    this.app.applicationContext.registerObject(
      'curl',
      _.get(this.app.httpclient, 'request')
    );
    // #endregion
  }

  async willReady() {
    const listen = this.app.config.cluster.listen;
    const uri = `http://${listen.hostname}:${listen.port}`;
    // 请将你的应用项目中 app.beforeStart 中的代码置于此处。 sequelize
    const db: IDBContext = await this.app.applicationContext.getAsync('DB');
    await db.init(this.app);

    console.log(`✅  ${uri}/api/hello`);
    console.log(`✅  ${uri}/graphql`);

    // agent message 注册
    // const appMessenger = await this.app.applicationContext.getAsync(
    //   'appMessenger'
    // );
    // appMessenger.on(this.app);
  }

  async didReady() {}
}

module.exports = AppBootHook;
