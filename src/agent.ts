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
    const redis = agent.getConfig('redis');
    const orderRedis = new Redis(redis.client);
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

    // key失效时间
    orderRedis.on('message', (pattern, channel, message) => {
      console.log(`${key}:on:${pattern}-${channel}-${message}`);
      const redisKeys = channel.split(/:/g);
      agent.messenger.sendToApp(`redisExpired`, {
        service: redisKeys[0],
        action: redisKeys[1],
        value: redisKeys[2],
      });
    });
  });
};
