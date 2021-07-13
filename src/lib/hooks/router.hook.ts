import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { ROUTER, RouterModel } from '../models/router.model';
import { ROUTER_ROLE, RouterRoleModel } from '../models/router-role.model';
import * as Bb from 'bluebird';

@provide('RouterHook')
export class RouterHook {
  async beforeDestroy(
    model: RouterModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { routerIbfk2, routerRoleIbfk3 } = await Bb.props({
      routerIbfk2: RouterModel.findOne({
        where: {
          [ROUTER.PARENT_ID]: model.get('id'),
        },
      }),
      routerRoleIbfk3: RouterRoleModel.findOne({
        where: {
          [ROUTER_ROLE.ROUTER_ID]: model.get('id'),
        },
      }),
    });
    if (routerIbfk2 || routerRoleIbfk3) {
      throw new Error('已使用数据禁止删除');
    }
  }
}
