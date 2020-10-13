import { Application, provide } from 'midway';
import { IRedisExpiredData } from '../interfaces/agent.interface';
import * as _ from 'lodash';

@provide()
export class AppMessenger {
  on(app: Application) {
    app.messenger.on('redisExpired', (data: IRedisExpiredData) =>
      this.redisExpired(data, app)
    );
  }
  async redisExpired(data: IRedisExpiredData, app: Application) {
    const service = await app.applicationContext.getAsync(
      `${data.service}Agent`
    );
    _.get(service, data.action)(data.value);
  }
}
