/*
 * @Author: zhanchao.wu
 * @Date: 2020-08-15 21:16:00
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-10-10 15:36:39
 */
import { provide, inject, init, Context } from 'midway';
import { BASEMODEL, BaseModel, IBaseModel } from './model.base';
import { IQueryListParam } from '../interfaces/param.interface';
import * as _ from 'lodash';
import { IDBContext } from '../models/db';
import { Transaction } from 'sequelize/types';
import DataLoader = require('dataloader');
import FlakeId = require('flake-idgen');
import intformat = require('biguint-format');
import { IAuth } from '../interfaces/auth.interface';
import { ISequelizeQuery } from '../utils/sequelize-query';
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });

@provide()
export abstract class ServiceBase {
  @init()
  init() {
    this.loader = new DataLoader((ids) => this.fetch(ids));
    this._ = _;
    this.throw = this.ctx.throw;
  }

  @inject()
  private ctx: Context;

  @inject('Auth')
  auth: IAuth;

  loader: any;

  newId() {
    return _.toString(intformat(flakeIdgen.next(), 'dec'));
  }

  throw: (message: string, code?: number) => void;

  _: _.LoDashStatic;

  async fetch(ids: any) {
    const id = ids.length === 1 ? ids[0] : ids;
    const results = await this.findAll({
      where: {
        id,
      },
    });
    return ids.map((key: string) => results.find((p) => p.id === key));
  }

  async fetchByIds(ids: any) {
    if (!ids) {
      return undefined;
    }
    return await this.loader.loadMany(ids);
  }
  async fetchById(id: string) {
    if (!id) {
      return undefined;
    }
    return (await this.loader.load(id)) || {};
  }

  @inject('DB')
  db: IDBContext;

  abstract get Model(): IBaseModel;

  // abstract createOptions(
  //   param: any
  // ): { include?: [any]; transaction?: any; validate?: boolean };

  @inject()
  logger: any;

  @inject()
  sequelizeQuery: ISequelizeQuery;

  objectMapping(obj: any, target: any, mapping: {} = {}) {
    if (!obj || !target) {
      return;
    }
    this._.keys(target)
      .filter((k) => k !== 'id')
      .forEach((k) => {
        if (mapping && mapping[k] && target[mapping[k]]) {
          _.set(obj, k, target[mapping[k]]);
        }
        if (target[k]) {
          _.set(obj, k, target[k]);
        }
      });
  }

  private findParamUtils(param: IQueryListParam) {
    !_.get(param, 'order') && _.set(param, 'order', [['id', 'DESC']]);
    _.set(param, 'limit', _.get(param, 'limit', 1000));
    _.get(param, 'where') &&
      _.set(param, 'where', this.sequelizeQuery.where(param.where));
  }

  async findList(
    param: IQueryListParam
  ): Promise<{ count: number; list: [any] }> {
    this.findParamUtils(param);
    const [count, list] = await Promise.all([
      this.Model.count(param),
      this.Model.findAll(param),
    ]);
    return { count, list };
  }

  async findAll(param: IQueryListParam): Promise<[any]> {
    this.findParamUtils(param);
    return this.Model.findAll(param);
  }

  async findByPk(id: string): Promise<any> {
    return this.Model.findByPk(id);
  }

  // private async upsert(param: any): Promise<any> {
  //   const result = await this.Model.upsert(param);
  //   return result;
  // }

  hookSave(param: BaseModel) {
    const id = this._.get(this.auth, 'id');
    const type = this._.get(this.auth, 'type');
    const userId = `${id}:${type}`;
    param.id && this._.set(param, BASEMODEL.UPDATEDID, userId);
    param.id || this._.set(param, BASEMODEL.CREATEDID, userId);
  }

  async save(param: any, must = false): Promise<any> {
    this.hookSave(param);
    if (param.id) {
      const result = await this.Model.update(param, {
        where: { id: param.id },
      });
      if (result[0] || !must) {
        return param.id;
      }
      throw new Error(`[${param.id}] id must exis`);
    }
    const createOptions = _.get(this, 'createOptions');
    // 不存在 options方法
    if (!createOptions) {
      const result = await this.Model.create(param);
      return result.id;
    }
    const options = createOptions(param);
    // 默认事务
    if (options.include && !options.transaction) {
      const result = await this.db.sequelize.transaction((t: Transaction) => {
        return this.Model.create(param, {
          ...options,
          transaction: t,
        });
      });
      return result.id;
    }
    const result = await this.Model.create(param, options);
    return result.id;
  }

  async bulkCreate(param: any[]): Promise<any> {
    param.forEach((p) => this.hookSave(p));
    return this.Model.bulkCreate(param);
  }

  async destroy(where: any, limit: number, force: boolean = false) {
    return this.Model.destroy({ where, limit, force });
  }
}
