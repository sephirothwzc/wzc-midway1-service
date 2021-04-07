import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { ROLE_GROUP_ITEM, RoleGroupItemModel } from '../models/role-group-item.model';
import * as Bb from 'bluebird';
import { ROLE_GROUP, RoleGroupModel } from '../models/role-group.model';

@provide('RoleGroupHook')
export class RoleGroupHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { roleGroupItemIbfk2 } = await Bb.props({
        roleGroupItemIbfk2: RoleGroupItemModel.findOne({
          where: {
            [ROLE_GROUP_ITEM.ROLE_GROUP_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (roleGroupItemIbfk2) {
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

    if (changed.includes(ROLE_GROUP.GROUP_CODE) && model.get('GroupCode')) {
      const item0 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_CODE]: model.get('GroupCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组编号已存在');
      }
    }
    

    if (changed.includes(ROLE_GROUP.GROUP_NAME) && model.get('GroupName')) {
      const item1 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_NAME]: model.get('GroupName'),
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

    if (model.get('GroupCode')) {
      const item0 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_CODE]: model.get('GroupCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组编号已存在');
      }
    }
    

    if (model.get('GroupName')) {
      const item1 = await RoleGroupModel.findOne({
        where: {
          [ROLE_GROUP.GROUP_NAME]: model.get('GroupName'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('组名已存在');
      }
    }
    
  }
  
}
