import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { WEBAPI, WebapiModel } from '../models/webapi.model';
import { WEBAPI_ROLE, WebapiRoleModel } from '../models/webapi-role.model';
import * as Bb from 'bluebird';

@provide('WebapiHook')
export class WebapiHook {
  async beforeDestroy(
    model: WebapiModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { webapiIbfk2, webapiRoleIbfk3 } = await Bb.props({
      webapiIbfk2: WebapiModel.findOne({
        where: {
          [WEBAPI.PARENT_ID]: model.get('id'),
        },
      }),
      webapiRoleIbfk3: WebapiRoleModel.findOne({
        where: {
          [WEBAPI_ROLE.WEBAPI_ID]: model.get('id'),
        },
      }),
    });
    if (webapiIbfk2 || webapiRoleIbfk3) {
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

    if (changed.includes(WEBAPI.CODE) && model.get('code')) {
      const item0 = await WebapiModel.findOne({
        where: {
          [WEBAPI.CODE]: model.get('code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('路由编码已存在');
      }
    }

    if (changed.includes(WEBAPI.PATH) && model.get('path')) {
      const item1 = await WebapiModel.findOne({
        where: {
          [WEBAPI.PATH]: model.get('path'),
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
    if (model.get('code')) {
      const item0 = await WebapiModel.findOne({
        where: {
          [WEBAPI.CODE]: model.get('code'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('路由编码已存在');
      }
    }

    if (model.get('path')) {
      const item1 = await WebapiModel.findOne({
        where: {
          [WEBAPI.PATH]: model.get('path'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('路由已存在');
      }
    }
  }
}
