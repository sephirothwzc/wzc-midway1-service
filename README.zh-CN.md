# 开发规范

## db shell

```shell
#创建文件
$ npx sequelize migration:generate --name=init-users
$ npx sequelize seed:generate --name app-user

# 升级数据库
$ npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
$ npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
$ npx sequelize db:migrate:undo:all
$ export NODE_ENV='production' && npx sequelize db:migrate
# 撤销某一个
$ npx sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
# cli 设置 echo production 之后 一定要改回 local

# 种子
$ npx sequelize db:seed:all
$ npx sequelize-cli db:seed:undo
$ npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
$ npx sequelize-cli db:seed:undo:all
```

## 编码规范

### 数据库规范

- 禁止使用的关键字

model

- 单数命名不使用复数

```shell
# 正例
user
# 反例
users
```

- table\column
  全小写，下划线分词
- 主键  
  id（pk 开头 or sequelize 默认）
- 默认字段
  - created_at
  - updated_at
  - deleted_at
- not null
  - 根据业务值进行默认值设置优先推荐的默认值顺序：''>0>-1>特殊定义
  - datetime、date、timestamp：按照业务需要为 null 的情况下，尽量作为辅助字段，不作为优先筛选字段，例如搭配 state 字段
- function  
  全小写下划线分词，[fun_]开头。根据业务复杂程度尽量不要启用自定义函数。
- view  
  全小写下划线分词，[v_]开头。
- trigger
  全小写下划线分词，[tri_]开头。
- 关系  
  [表名_id]
- 常规业务采用三范式原则，交易、金钱、积分相关业务保证数据留痕，以及性能采用反范式。
- 冗余字断不要使用原字断名，可以考虑通过前缀区分例如[表名_字断名]
- hooks 命名要求 provide 帕斯卡命名 方法名同 hooks function

```typescript
import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { AppUserModel } from '../models/app-user.model';

@provide('AppUserHook')
export class AppUserHook {
  async beforeCreate(
    appUserModel: AppUserModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (!appUserModel.phone) {
      throw new Error('请填写手机号');
    }
    const result = await AppUserModel.findOne({
      where: { phone: appUserModel.phone },
      transaction: options.transaction,
    });
    if (result) {
      throw new Error('手机号已经存在');
    }
  }
}
```

### 项目编码规范

- 文件、文件夹 小写中横线分词
- 文件后缀

```typescript
controller; // 无后缀
mongoose doc I+帕斯卡 doc后缀 [IUserDoc] 文件名 user.doc.ts
mongoose model // 无后缀
service // *.service.ts
base // *.base.ts
sequelize model // *.model.ts
test // *.test.ts
```

- 类名 帕斯卡命名
- 接口名 I+帕斯卡命名
- schema 命名 S+帕斯卡命名 In\S+帕斯卡命名 Out
- 方法名 小驼峰
- 变量名 小驼峰
- Model 名 帕斯卡
- inject 名 帕斯卡
- 常量 全大写下划线分词
- 枚举 E+帕斯卡命名，枚举 item name 帕斯卡命名
- 命名要求简洁明了 英文命名，如果不明确命名可以采用，类型命名法 如: string1、string2 不允许其他无意义命名
- 代码层级不允许超过 4 级
- 鉴于换行等因素 function 不允许超过 60 行
- 路由命名优先 restful api 定向 api 采用 soa 命名 路由采用全小写中横线分词
- 注释 方法采用 document this 变量使用/\* \*/
- private
- function param type in I[function]In、out I[function]Out
- 文件必须启用 vscode-fileheader
- 类作为名词存在，则 action 尽量采用动词，单一职责动词不需要追加名词。
- 建议命名如下

```typescript
# router controller
@get('/')
async find(ctx:Context) {}

@get('/:id')
async findOne(ctx:Context) {}

@post('/')
async create(ctx:Context) {}

@put('/:id') // or body
async update(ctx:Context) {}

@del('/:id') // or query
async destroy(ctx:Context) {}

service:
async findAll(param:IFindAllIn):Promise<Model[]> {}

async findAndCountAll(param: IFindAndCountAllIn): Promise<IFindAndCountAllOut> {}

... findOne ...

async create(param:ICreateIn):Promise<ICreateOut> {}

... update ...

... destroy ...

```

### 错误码

- 204  
  前端处理
- 401  
  前端处理-权限错误
  - 401.1 token 失效
  - 401.2 未携带 token
- 422
  后端参数校验错误-message
- 500
  前端处理（后端方法错误）
- 511
  前端处理（已知错误提示）
- 512
  後端处理 (已知错误提示)

### 版本号管理

1. vX.X.X（产品版本.计划版本.bug 修正 or 细节迭代）
2. 小版本 bug 修正 统统 末尾追加

```bash
  v1.1.1
  dev 修改内容备注
```

### Git Flow

- Production 分支[master]
  也就是我们经常使用的 master 分支，这个分支最近发布到生产环境的代码，最近发布的 Release， 这个分支只能从其他分支合并，不能在这个分支直接修改
  tag: prd-版本号

- Develop 分支[develop]
  这个分支是我们是我们的主开发分支，包含所有要发布到下一个 Release 的代码，这个主要合并与其他分支，比如 Feature 分支
  tag: dev-版本号-年月日时分

- Feature 分支[feature/[v0.0.1-***]]
  这个分支主要是用来开发一个新的功能，一旦开发完成，我们合并回 Develop 分支进入下一个 Release
  版本号为下一版本版本号
  tag: fea-版本号-年月日时分

- Release 分支[release/[v0.0.1-***]]
  当你需要一个发布一个新 Release 的时候，我们基于 Develop 分支创建一个 Release 分支，完成 Release 后，我们合并到 [Master]和[Develop]分支
  版本号为下一版本版本号
  \*\*\* merage-request \*\*\*
  tag: qa-版本号-[issues]-年月日时分

- Hotfix 分支[hotfix/[v0.0.1-***]]
  当我们在 Production 发现新的 Bug 时候，我们需要创建一个 Hotfix, 完成 Hotfix 后，我们合并回 Master 和 [Develop]分支，所以[Hotfix]的改动会进入下一个[Release]
  版本号为当前修正版本版本号
  tag: fix-版本号-[issues]-年月日时分

### commitlint 提交方式

1. 暂存需提交代码，执行`yarn commit`命令，然后根据提示填写相应文字
2. 强制要求填写更改类型以及简要描述
3. 执行完后会生成 CHANGELOG.md 提交日志文件,这个文件可以通过 git 标签来管理，它会自动获取 git 标签信息（标签格式`vX.X.X`）
4. 运行`yarn changelog`可以手动刷新日志

### 框架使用

- schema joi /src/lib/schemas 目录下创建 [user.schema.ts]同 controller 目录的 [user].ts
  router: controller('api/user');post('/login') => map => loginPostIn

- input property must input not type
- 主外键 仅 dev 库启用 表迁移主外键注意创建顺序

### openssl

```shell
# 生成RSA私钥(无加密)
$ openssl genrsa -out ./src/config/keys/rsa_private.key 2048

# 生成RSA公钥
$ openssl rsa -in ./src/config/keys/rsa_private.key -pubout -out ./src/config/keys/rsa_public.key
```

### build 顺序

```shell
# cp 拷贝文件到 dist目录
"build": "midway-bin build -c && cp -rv src/config/keys dist/config/ && cp -rv src/app/graphql dist/app/graphql/",

```

### redis

```shell
# 启动
$ redis-server /usr/local/etc/redis.conf
# 关闭
$ redis-cli shutdown
# 查看链接
$  client list

# 测试服务器68
$ cd /redis-2.8.17/src
$ ./redis-server ../redis.conf
```

```TypeScript
import Redis = require('ioredis');

import * as _ from 'lodash';
import { EggLoggers } from 'midway';
interface IAgent {
  env: string;
  name: string;
  baseDir: string;
  subdomainOffset: string;
  config: string;
  loggers: EggLoggers;
  [k: string]: any;
}

module.exports = (agent: IAgent) => {
  // 在这里写你的初始化逻辑
  // 也可以通过 messenger 对象发送消息给 App Worker
  // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.on('egg-ready', () => {
    // const redis = agent.getConfig('redis');
    const orderRedis = new Redis();
    // const key = `__keyevent@${_.get(redis, 'client.db')}__:expired`;
    const key = '__keyevent@0__:expired';
    orderRedis.subscribe(key, (err, count) => {
      // Now we are subscribed to both the 'news' and 'music' channels.
      // `count` represents the number of channels we are currently subscribed to.
      console.log(`${key}:${count}`);
      console.log(`${key}:${err}`);
      // this.app.redis.publish('news', 'Hello world!');
      // this.app.redis.publish('music', 'Hello again!');
    });

    // key 只能为message 不能为 pmessage
    orderRedis.on('message', (pattern, channel, message) => {
      console.log(`${key}:on:${pattern}-${channel}`);
      // agent.loggers.info(`${key}:on:${message}-${channel}`);
    });
  });
};
```

### joi

- restful [last router name][method][In/Out]
  例：loginPostIn
- graphql [name][query/mutation]
  例：orderAllQuery、orderMutation

### yarn

```shell
# 临时更改仓库 淘宝
$ yarn save 软件名 --registry https://registry.npm.taobao.org/
```
