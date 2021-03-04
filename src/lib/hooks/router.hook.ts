import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { ROUTER, RouterModel } from '../models/router.model';
import { ROUTER_ROLE, RouterRoleModel } from '../models/router-role.model';
import * as Bb from 'bluebird';

@provide('RouterHook')
export class RouterHook {
  async beforeBulkDestroy(model: {
    where: { id: string };
    transaction: Transaction;
  }) {
    const { routerIbfk1, routerRoleIbfk2 } = await Bb.props({
      routerIbfk1: RouterModel.findOne({
        where: {
          [ROUTER.PARENT_ID]: _.get(model, 'where.id'),
        },
      }),
      routerRoleIbfk2: RouterRoleModel.findOne({
        where: {
          [ROUTER_ROLE.ROUTER_ID]: _.get(model, 'where.id'),
        },
      }),
    });
    if (routerIbfk1 || routerRoleIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }
}
