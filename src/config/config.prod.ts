import { Context } from 'midway';

export const jwt = {
  secret: 'lakifsihdfcpohii',
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
    const authToken = await ctx.requestContext.getAsync(`authToken`);
    await authToken.signToken();
  },
  // // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  async onPreGraphiQL(ctx: Context) {},
};

/**
 * sequelize数据库链接
 */
export const sequelize = {
  host: 'rm-8vb9k9rdy6ayl0o2237690.mysql.zhangbei.rds.aliyuncs.com',
  port: 3306,
  database: 'financial_system_prd',
  username: 'root_prod',
  password: 'xegDed-govcu1-mitpun',
  timezone: '+08:00',
  modelFile: 'js',
  // dialectOptions: {
  //   dateStrings: true,
  //   typeCast: (field: any, next: () => void) => {
  //     // for reading from database
  //     if (field.type === 'DATETIME') {
  //       return field.string();
  //     }
  //     return next();
  //   },
  // },
};

export const alioss = {
  url: 'http://localhost:8021/api/oss',
};

export const wxapi = {
  url: 'http://localhost:8023',
};

export const redis = {
  client: {
    port: 6379,
    host: '172.16.216.85',
    password: '',
    db: 0,
  },
};

export const onerror = {
  // all(err, ctx) {
  //   // 在此处定义针对所有响应类型的错误处理方法
  //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //   ctx.body = { message: err };
  // },
  html(err: Error, ctx: Context) {
    // html hander
    ctx.body = err.message;
  },
  json(err: Error, ctx: Context) {
    // json hander
    ctx.body = err.message;
  },
};
