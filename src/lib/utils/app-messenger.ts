import { Application, provide } from 'midway';
import { IRedisExpiredData } from '../interfaces/agent.interface';
import * as _ from 'lodash';

@provide()
export class AppMessenger {
  on(app: Application) {
    // app.messenger.on('redisExpired', (data: IRedisExpiredData) =>
    //   this.redisExpired(data, app)
    // );
    // app.messenger.on('redisluckSub', (data: string) => {
    //   this.appUserLuckAgent.luck(data);
    // });
  }
  async redisExpired(data: IRedisExpiredData, app: Application) {
    if (
      !app.applicationContext.registry.identifiers.includes(
        `${data.service}Agent`
      )
    ) {
      return;
    }
    const service = await app.applicationContext.getAsync(
      `${data.service}Agent`
    );
    _.get(service, data.action)(data.value);
  }
}
