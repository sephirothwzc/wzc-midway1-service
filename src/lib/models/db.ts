/*
 * @Author: zhanchao.wu
 * @Date: 2020-09-01 15:31:00
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-11-04 19:10:45
 */
import { Model, Sequelize } from 'sequelize-typescript';
import { provide, scope, ScopeEnum, config, Application } from 'midway';
import * as _ from 'lodash';

interface ISequelizeConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: string;
  timezone: '+08:00';
  /**
   * 存储目录，项目目录后缀目录 ts\js
   */
  modelFile: string;
  dialectOptions?: {
    useUTC: false;
    dateStrings: true;
    typeCast: (field: any, next: () => void) => any;
  };
}

export interface IDBContext extends DB {}

@scope(ScopeEnum.Singleton)
@provide('DB')
export class DB {
  sequelize: Sequelize;

  @config('sequelize')
  config: ISequelizeConfig;

  @config('env')
  env: string;

  async init(app: Application) {
    return await new Promise(async (resolve) => {
      this.sequelize = new Sequelize({
        dialect: 'mysql',
        host: this.config.host,
        timezone: this.config.timezone,
        port: this.config.port,
        database: this.config.database,
        username: this.config.username,
        password: this.config.password,
        storage: ':memory:',
        modelPaths: [__dirname + `/*.model.${this.config.modelFile}`],
        modelMatch: (filename, member) => {
          return _.endsWith(member, 'Model');
        },
        define: {
          timestamps: true,
          paranoid: true,
          charset: 'utf8',
          underscored: true,
          hooks: {
            // beforeCreate: (instance: BaseModel) => {
            //   // Do other stuff
            // },
            // beforeUpdate: (instance: BaseModel) => {
            //   // Do other stuff
            // },
          },
        },
        dialectOptions: this.config.dialectOptions,
      });
      _.set(this.sequelize, 'app', app);
      await this.hooks(app);
      // load hooks
      return this.sequelize
        .authenticate()
        .then(() => {
          console.log('DataBase Connection successfully!');
          resolve();
        })
        .catch((err: any) => {
          throw new Error(`Unable to connect to the database:${err}`);
        });
    });
  }

  /**
   * 加载hooks
   */
  async hooks(app: Application) {
    this.sequelize.modelManager.models.forEach(async (p: typeof Model) => {
      const hookName = p.name.replace(/(.*)Model/, '$1Hook');
      if (app.applicationContext.registry.identifiers.includes(hookName)) {
        const hook = await app.applicationContext.getAsync(hookName);
        Reflect.ownKeys(hook.__proto__)
          .filter((k) => k !== 'constructor')
          .forEach((k: string) => {
            const hookTemp = _.get(p, `options.hooks.${k}`, []);
            p.options.hooks[k] = [...hookTemp, hook[k]];
          });
      }
    });
  }
}
