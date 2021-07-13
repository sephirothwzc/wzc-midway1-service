import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { ROLE_GROUP_ITEM, RoleGroupItemModel } from '../models/role-group-item.model';
import * as Bb from 'bluebird';
import { ROLE_GROUP, RoleGroupModel } from '../models/role-group.model';

@provide('RoleGroupHook')
export class RoleGroupHook {

  async beforeDestroy(
    model: RoleGroupModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { roleGroupItemIbfk3 } = await Bb.props({
        roleGroupItemIbfk3: RoleGroupItemModel.findOne({
          where: {
            [ROLE_GROUP_ITEM.ROLE_GROUP_ID]: model.get('id'),
          },
        }),
    });
    if (roleGroupItemIbfk3) {
      throw new Error('已使用数据禁止删除');
    }
  }


  async beforeUpdate(
    model: RoleGroupModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(ROLE_GROUP.GROUP_CODE) && model.get('groupCode')) {
      const item0 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_CODE]: model.get('groupCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组编号已存在');
      }
    }
    

    if (changed.includes(ROLE_GROUP.GROUP_NAME) && model.get('groupName')) {
      const item1 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_NAME]: model.get('groupName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('组名已存在');
      }
    }
    
  }

  async beforeCreate(
    model: RoleGroupModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('groupCode')) {
      const item0 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_CODE]: model.get('groupCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组编号已存在');
      }
    }
    

    if (model.get('groupName')) {
      const item1 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_NAME]: model.get('groupName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('组名已存在');
      }
    }
    
  }
  
}
