import { provide } from 'midway';
import * as _ from 'lodash';
import { Op } from 'sequelize';

export interface ISequelizeQuery extends SequelizeQuery {}
@provide()
export class SequelizeQuery {
  where(param: any) {
    if (!param || !_.isObject(param)) {
      return param;
    }
    let where = {};
    _.keys(param).forEach((key: string) => {
      if (_.isArray(param[key])) {
        param[key] = param[key].map((obj: any) => {
          return this.where(obj);
        });
      } else if (_.isObject(param[key])) {
        param[key] = this.where(param[key]);
      }
      if (!_.startsWith(key, '_')) {
        where[key] = param[key];
      } else {
        const sqkey = key.substring(1, key.length);
        where[Op[sqkey]] = param[key];
      }
    });
    return where;
  }
}
