import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { WEBAPI, WebapiModel } from '../models/webapi.model';
import { WEBAPI_ROLE, WebapiRoleModel } from '../models/webapi-role.model';
import * as Bb from 'bluebird';

@provide('WebapiHook')
export class WebapiHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { webapiIbfk1, webapiRoleIbfk2 } = await Bb.props({
        webapiIbfk1: WebapiModel.findOne({
          where: {
            [WEBAPI.PARENT_ID]: _.get(model, 'where.id'),
          },
        }),
        webapiRoleIbfk2: WebapiRoleModel.findOne({
          where: {
            [WEBAPI_ROLE.WEBAPI_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (webapiIbfk1 || webapiRoleIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


  async beforeUpdate(
    model: WebapiModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(WEBAPI.CODE) && model.get('Code')) {
      const item0 = await WebapiModel.findOne({
        where: {
          [WEBAPI.CODE]: model.get('Code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('路由编码已存在');
      }
    }
    

    if (changed.includes(WEBAPI.PATH) && model.get('Path')) {
      const item1 = await WebapiModel.findOne({
        where: {
          [WEBAPI.PATH]: model.get('Path'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('路由已存在');
      }
    }
    
  }

  async beforeCreate(
    model: WebapiModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('Code')) {
      const item0 = await WebapiModel.findOne({
        where: {
          [WEBAPI.CODE]: model.get('Code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('路由编码已存在');
      }
    }
    

    if (model.get('Path')) {
      const item1 = await WebapiModel.findOne({
        where: {
          [WEBAPI.PATH]: model.get('Path'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('路由已存在');
      }
    }
    
  }
  
}
