/*
 * @Author: zhanchao.wu
 * @Date: 2020-08-15 21:16:00
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-12-02 19:12:49
 */
import { provide, inject, init, Context, IApplicationContext } from 'midway';
import { BASEMODEL, BaseModel, IBaseModel } from './model.base';
import { IQueryListParam } from '../interfaces/param.interface';
import * as _ from 'lodash';
import { IDBContext } from '../models/db';
import { Transaction } from 'sequelize/types';
import DataLoader = require('dataloader');
import { IAuth } from '../interfaces/auth.interface';
import { ISequelizeQuery } from '../utils/sequelize-query';
import { SnowFlake } from '../use-plugins/flake-id';
import { devShowError } from '../utils/runtime-helper';

@provide()
export abstract class ServiceBase {
  @init()
  init() {
    this.loader = new DataLoader((ids) => this.fetch(ids));
    this._ = _;
    this.throw = this.ctx?.throw;
    this.logger = this.ctx?.logger;
    this.devShowError = devShowError;
  }

  /**
   * 环境错误信息显示
   */
  devShowError: (errorMsg: string) => string;

  @inject()
  snowFlake: SnowFlake;

  @inject('DB')
  db: IDBContext;

  abstract get Model(): IBaseModel;

  // @inject()
  logger: any;

  @inject()
  sequelizeQuery: ISequelizeQuery;

  @inject()
  private ctx: Context;

  @inject('Auth')
  auth: IAuth;

  loader: any;

  /**
   * 获取新的id
   */
  get nextId(): string {
    return this.snowFlake.next();
  }

  throw: (message: string, code?: number) => void;

  _: _.LoDashStatic;

  /**
   * loader bypk
   * @param ids
   */
  async fetch(ids: any) {
    const id = ids.length === 1 ? ids[0] : ids;
    if (ids.length === 1) {
      const result = await this.findByPk(ids[0]);
      return [result];
    } else if (ids.length > 1) {
      const results = await this.findList({
        where: {
          id,
        },
      });
      return ids.map((key: string) => results.find((p) => p.id === key));
    }
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

  /**
   * 对象映射赋值
   * @param obj
   * @param target
   * @param mapping
   */
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

  /**
   * 参数处理 where _ 转 Op
   * @param param
   */
  private findParamUtils(param: IQueryListParam, oneLimit: Boolean = true) {
    const squelizeParam = {};
    !_.get(param, 'order')
      ? _.set(squelizeParam, 'order', [['id', 'DESC']])
      : _.set(squelizeParam, 'order', param.order);
    oneLimit && _.set(squelizeParam, 'limit', _.get(param, 'limit', 1000));
    oneLimit &&
      _.get(param, 'offset') &&
      _.set(squelizeParam, 'offset', param.offset);
    _.get(param, 'where') &&
      _.set(squelizeParam, 'where', this.sequelizeQuery.where(param.where));
    return squelizeParam;
  }

  /**
   * @deprecated
   */
  async findList(param: IQueryListParam): Promise<any[]> {
    const squelizeParam = this.findParamUtils(param);
    return this.Model.findAll(squelizeParam);
  }

  async findAll(param: IQueryListParam): Promise<any[]> {
    const squelizeParam = this.findParamUtils(param);
    return this.Model.findAll(squelizeParam);
  }

  async findOne<T>(param: IQueryListParam): Promise<T> {
    const squelizeParam = this.findParamUtils(param, false);
    return this.Model.findOne(squelizeParam) as any;
  }

  async findCount(param: IQueryListParam): Promise<number> {
    const squelizeParam = this.findParamUtils(param);
    return this.Model.count(squelizeParam);
  }

  async findByPk(id: string): Promise<any> {
    return this.Model.findByPk(id);
  }

  /**
   * 记录操作人id
   * @param param
   */
  hookSave(param: BaseModel) {
    const id = this._.get(this.auth, 'id');
    this._.set(param, BASEMODEL.UPDATEDID, id);
    this._.set(param, BASEMODEL.CREATEDID, id);
  }

  /**
   * 是否启用事务
   * @param param
   */
  private enableTransaction(options?: { hookName?: HooksName }): Boolean {
    if (options) {
      return this.Model.hasHook(options.hookName);
    }
    return false;
  }

  /**
   * sequelize save
   * @param param
   * @param must
   */
  private async ormUpdate(
    param: BaseModel,
    t?: Transaction
  ): Promise<BaseModel> {
    return await this.Model.findByPk(param.id, { transaction: t }).then(
      (result: BaseModel) => {
        if (!result) {
          throw new Error(`[${param.id}]不存在！`);
        }
        this.setChange(result, param);
        return result.save({ transaction: t });
      }
    );
  }

  /**
   * update
   * @param param
   */
  private async update(param: BaseModel) {
    const tran = this.enableTransaction({
      hookName: HooksName.beforeUpdate,
    });
    let result: BaseModel;
    if (tran) {
      result = await this.db.sequelize.transaction((t: Transaction) => {
        return this.ormUpdate(param, t);
      });
    } else {
      result = await this.ormUpdate(param);
    }
    return { id: result.id };
  }

  async findCreateOptions(
    param: BaseModel
  ): Promise<{ include?: [any]; transaction?: any; validate?: boolean }> {
    const context: IApplicationContext = this.ctx.requestContext
      .applicationContext;
    const has: Boolean = context.registry.identifiers.includes(
      `${_.camelCase(this.Model.name)}.createOptions`
    );
    if (!has) {
      return {};
    }
    const createOptions: (
      param: BaseModel
    ) => {
      include?: [any];
      transaction?: any;
      validate?: boolean;
    } = await context.getAsync(`${_.camelCase(this.Model.name)}.createOptions`);
    return createOptions(param);
  }

  private setChange(resultModel: any, param: BaseModel) {
    this._.keys(param).forEach((k) => {
      resultModel.set(k, param[k]);
    });
  }

  /**
   * 保存
   * @param param model
   */
  async save(param: BaseModel): Promise<any> {
    this.hookSave(param);
    // 修改
    if (param.id) {
      return this.update(param);
    }
    // 获取createOptions
    const options = await this.findCreateOptions(param);
    const tran = this.enableTransaction({
      hookName: HooksName.beforeCreate,
    });
    // 默认事务
    if ((options.include && !options.transaction) || tran) {
      const result = await this.db.sequelize.transaction((t: Transaction) => {
        return this.Model.create(param, {
          ...options,
          transaction: t,
        });
      });
      return { id: result.id };
    }
    const result = await this.Model.create(param, options);
    return { id: result.id };
  }

  async bulkCreate(param: any[]): Promise<any> {
    param.forEach((p) => this.hookSave(p));
    return this.Model.bulkCreate(param);
  }

  async destroy(where: any, limit: number, force: boolean = false) {
    return this.Model.destroy({ where, limit, force });
  }
}

enum HooksName {
  beforeUpdate = 'beforeUpdate',
  beforeCreate = 'beforeCreate',
  beforeBulkDestroy = 'beforeBulkDestroy',
}
