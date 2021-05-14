import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { ROUTER, RouterModel } from '../models/router.model';
import { ROUTER_ROLE, RouterRoleModel } from '../models/router-role.model';
import * as Bb from 'bluebird';
import { RouterModel } from '../models/router.model';

@provide('RouterHook')
export class RouterHook {

  async beforeDestroy(
    model: RouterModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { routerIbfk1, routerRoleIbfk2 } = await Bb.props({
        routerIbfk1: RouterModel.findOne({
          where: {
            [ROUTER.PARENT_ID]: model.get('id'),
          },
        }),
        routerRoleIbfk2: RouterRoleModel.findOne({
          where: {
            [ROUTER_ROLE.ROUTER_ID]: model.get('id'),
          },
        }),
    });
    if (routerIbfk1 || routerRoleIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
