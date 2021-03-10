import { Context } from 'midway';
import { IAuth } from '../lib/interfaces/auth.interface';
import { AppUserModel } from '../lib/models/app-user.model';
import { AuthToken } from '../lib/utils/auth-token';
import { IAppUserService } from '../service/app-user.service';

export const development = {
  watchDirs: [
    'app',
    'lib',
    'service',
    'config',
    'app.ts',
    'agent.ts',
    'interface.ts',
  ],
  overrideDefault: true,
};

export const jwt = {
  secret: '123456',
};

export const mongoose = {
  client: {
    url: 'mongodb://127.0.0.1:27017/midwaybase',
    options: {},
    // mongoose global plugins, expected a function or an array of function and options :createdPlugin, [updatedPlugin, pluginOptions]
    plugins: [],
  },
};

export const graphql = {
  router: '/graphql',
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
  graphiql: true,
  // 是否设置默认的Query和Mutation, 默认关闭
  defaultEmptySchema: true,
  // graphQL 路由前的拦截器
  async onPreGraphQL(ctx: Context) {
    const authToken: AuthToken = await ctx.requestContext.getAsync(`authToken`);
    const auth: IAuth = await ctx.requestContext.getAsync('Auth');

    if (ctx.query.userId) {
      auth.id = ctx.query.userId;
      auth.userName = ctx.query.userName;
      auth.exp = ctx.query.exp;
      // auth.type = ctx.query.type;
    }

    if (ctx?.request?.query?.token) {
      return await authToken.signByToken(ctx?.request?.query?.token);
    }
    if (ctx?.header['token']) {
      return await authToken.signByToken(ctx?.header['token']);
    }
    const appUserService: IAppUserService = await ctx.requestContext.getAsync(
      'appUserService'
    );
    const user = (await appUserService.findAll({ limit: 1 })) as [AppUserModel];
    auth.id = user[0].id;
    auth.userName = user[0].userName;
    // auth.type = user[0].appUserType;
    auth.exp = -1;
  },
  // // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  async onPreGraphiQL(ctx: Context) {},
  apolloServerOptions: {
    rootValue: (param) => {
      console.log(param);
    },
  },
};

/**
 * sequelize数据库链接
 */
export const sequelize = {
  port: 53306,
  host: 'rm-8vb5a7c204kxc3g93wo.mysql.zhangbei.rds.aliyuncs.com',
  // database: 'auth_center_dev',
  // username: 'root_develop',
  // password: 'eegDed-gbdacu3-ntuplw',
  database: 'auth_center_stage',
  username: 'root_stage',
  password: 'jidcab-narfuj-9Xossy',

  timezone: '+08:00',
  modelFile: 'ts',
};

// /**
//  * sequelize数据库链接-prod
//  */
// export const sequelize = {
//   port: 53306,
//   host: 'rm-8vb9k9rdy6ayl0o220o.mysql.zhangbei.rds.aliyuncs.com',
//   database: 'auth_center_prd',
//   username: 'root_prod',
//   password: 'xegDed-govcu1-mitpun',
//   timezone: '+08:00',
//   modelFile: 'ts',
// };


export const alioss = {
  url: 'http://localhost:8021/api/oss',
};

export const wxapi = {
  url: 'http://localhost:8023',
};

export const redis = {
  client: {
    port: 6379,
    host: '39.98.82.82',
    password: 'stage1234561qaz',
    db: 0,
  },
};
