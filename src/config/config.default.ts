import { Context, EggAppConfig, EggAppInfo, PowerPartial } from 'midway';
import * as path from 'path';
import * as os from 'os';
import * as _ from 'lodash';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // config.bodyParser = {
  //   enable: false,
  // };

  config.name = appInfo.name;

  config.httpclient = {
    // 是否开启本地 DNS 缓存，默认关闭，开启后有两个特性
    // 1. 所有的 DNS 查询都会默认优先使用缓存的，即使 DNS 查询错误也不影响应用
    // 2. 对同一个域名，在 dnsCacheLookupInterval 的间隔内（默认 10s）只会查询一次
    enableDNSCache: false,
    // 对同一个域名进行 DNS 查询的最小间隔时间
    dnsCacheLookupInterval: 10000,
    // DNS 同时缓存的最大域名数量，默认 1000
    dnsCacheMaxLength: 1000,

    request: {
      // 默认 request 超时时间
      timeout: 3000,
      headers: {
        // 区分不通业务端搭配 server端 appName 使用
        appName: appInfo.name,
      },
      contentType: 'json',
    },

    httpAgent: {
      // 默认开启 http KeepAlive 功能
      keepAlive: true,
      // 空闲的 KeepAlive socket 最长可以存活 4 秒
      freeSocketTimeout: 4000,
      // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
      timeout: 30000,
      // 允许创建的最大 socket 数
      maxSockets: Number.MAX_SAFE_INTEGER,
      // 最大空闲 socket 数
      maxFreeSockets: 256,
    },

    httpsAgent: {
      // 默认开启 https KeepAlive 功能
      keepAlive: true,
      // 空闲的 KeepAlive socket 最长可以存活 4 秒
      freeSocketTimeout: 4000,
      // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
      timeout: 30000,
      // 允许创建的最大 socket 数
      maxSockets: Number.MAX_SAFE_INTEGER,
      // 最大空闲 socket 数
      maxFreeSockets: 256,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597295642493_934';

  // add your config here
  config.middleware = [
    'gqlErrorHandler',
    'restfulAuth',
    'graphql',
    'validator',
  ];

  /**
   * 工作流
   */
  config.gqlWorkFlow = {
    ignore(ctx: Context) {
      return !(
        ctx.method === 'POST' &&
        ctx.url.includes('/graphql') &&
        ctx.request.body
      );
    },
  };

  /**
   * 工作流
   */
  config.gqlErrorHandler = {
    ignore(ctx: Context) {
      return !(
        ctx.method === 'POST' &&
        ctx.url.includes('/graphql') &&
        ctx.request.body
      );
    },
  };

  /**
   * 不走权限验证
   */
  const authMatch = {
    // 完全匹配
    matchAll: ['/api/app-user/login'],
    // 开头匹配
    matchStart: [],
    // matchAll、matchStart 是否反向匹配
    reverseMatch: false,
  };

  config.restfulAuth = {
    // 返回true=匿名访问，false=校验访问
    ignore(ctx: Context) {
      // 未设置访问权限对象，全部进行校验
      if (!authMatch) {
        return false;
      }
      // 已设置访问权限对象，未设置访问规则，按照匹配方式reverseMatch返回(正向返回false，反向返回true)
      if (!authMatch.matchAll && !authMatch.matchStart) {
        return authMatch.reverseMatch === true;
      }
      // 完全匹配(正向返回true，反向返回false)
      if (authMatch.matchAll.includes(ctx.path)) {
        return authMatch.reverseMatch !== true;
      }
      // 开头匹配(正向返回true，反向返回false)
      for (const startStr of authMatch.matchStart) {
        if (_.startsWith(ctx.path, startStr)) {
          return authMatch.reverseMatch !== true;
        }
      }
      return authMatch.reverseMatch === true;
    },
  };

  config.cluster = {
    listen: {
      port: 8501,
      hostname: '127.0.0.1',
    },
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false,
    },
    // 白名单域名
    domainWhiteList: ['*'],
  };

  config.multipart = {
    mode: 'file',
    // 追加白名单
    // fileExtensions: ['.jpg', '.jpeg', '.png'],
    // 覆盖白名单
    whitelist: [
      '.jpg',
      '.jpeg',
      '.png',
      '.xls',
      '.docx',
      '.doc',
      '.pdf',
      '.xlsx',
      '.csv',
    ],
    fileSize: '40mb',
    tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
    cleanSchedule: {
      // run tmpdir clean job on every day 04:30 am
      // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
      cron: '0 30 4 * * *',
    },
  };

  config.logger = {
    // dir: '/path/to/your/custom/log/dir',
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: `${appInfo.name}-core.log`,
    agentLogName: `${appInfo.name}-agent.log`,
    errorLogName: `${appInfo.name}-error.log`,
  };

  config.onerror = {
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
      ctx.body = {
        message: _.get(err, 'message'),
        stack: _.get(err, 'stack'),
        status: _.get(err, 'status'),
      };
    },
  };

  config.view = {
    root: [path.join(appInfo.baseDir, 'app/public')].join(','),
    // baseDir: 'app/public',
    defaultExtension: '.nj',
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  // static
  config.static = {
    prefix: '/web/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    gzip: true,
    buffer: true,
  };

  return config;
};
