import { inject, provide } from 'midway';
import * as _ from 'lodash';
import {
  FindAttributeOptions,
  Includeable,
  Op,
  Sequelize,
  WhereOptions,
} from 'sequelize';
import FlakeId = require('flake-idgen');
import intformat = require('biguint-format');
import { Include } from '../../service/custom/common.service';
import { IDBContext } from '../models/db';
// import { AppUserModel } from '../models/app-user.model';
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });

export interface ISequelizeQuery extends SequelizeQuery {}

@provide()
export class SequelizeQuery {
  @inject('DB')
  db: IDBContext;

  where(param: any): WhereOptions {
    if (!param || !_.isObject(param)) {
      return param;
    }
    let where = {};
    _.keys(param).forEach((key: string) => {
      if (_.isArray(param[key])) {
        where[key] = param[key].map((obj: any) => {
          return this.where(obj);
        });
      } else if (_.isObject(param[key])) {
        where[key] = this.where(param[key]);
        return where;
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
  attributes(param: string[]): FindAttributeOptions {
    return param.map((p) => {
      if (!p.includes(':')) {
        return _.camelCase(p);
      }
      const list = p.split(/:/);
      if (!_.isArray(list) || list.length != 3) {
        throw `attributes must string|Array<string>['COUNT','id','total']`;
      }
      return [
        Sequelize.fn(list[0], Sequelize.col(_.snakeCase(list[1]))),
        _.camelCase(list[2]),
      ];
    });
  }
  include(param: Include[]): Includeable[] {
    const result = param.map((p) => {
      const optionInclude = {};
      p.model &&
        _.set(
          optionInclude,
          'model',
          this.db.sequelize.model(`${_.upperFirst(_.camelCase(p.model))}Model`)
        );
      p.as && _.set(optionInclude, 'as', p.as);
      p.where && _.set(optionInclude, 'where', this.where(p.where));
      p.attributes &&
        _.set(optionInclude, 'attributes', this.attributes(p.attributes));
      p.required !== undefined && _.set(optionInclude, 'required', p.required);
      p.right && _.set(optionInclude, 'right', p.right);
      p.limit && _.set(optionInclude, 'limit', p.limit);
      p.include && _.set(optionInclude, 'include', this.include(p.include));
      return optionInclude;
    });
    return result;
  }
}

/**
 * table model 专用
 */
export class idNext {
  private static flakeIdgen: any;
  static next() {
    idNext.flakeIdgen ||
      (idNext.flakeIdgen = new FlakeId({ epoch: 1300000000000 }));
    return _.toString(intformat(flakeIdgen.next(), 'dec'));
  }
}
