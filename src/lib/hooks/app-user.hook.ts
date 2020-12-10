import * as _ from 'lodash';
import { provide } from 'midway';
import { Op, Transaction } from 'sequelize';
import { AppUserModel } from '../models/app-user.model';

@provide('AppUserHook')
export class AppUserHook {
  async beforeCreate(
    appUserModel: AppUserModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (!appUserModel.phone) {
      throw new Error('请填写手机号');
    }
    const result = await AppUserModel.findOne({
      where: { phone: appUserModel.phone },
      transaction: options.transaction,
    });
    if (result) {
      throw new Error('手机号已经存在');
    }
  }
  async beforeUpdate(
    appUserModel: AppUserModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = appUserModel.changed();
    if (!changed) {
      return;
    }
    if (!changed.includes('phone')) {
      return;
    }
    const result = await AppUserModel.findOne({
      where: {
        phone: appUserModel.get('phone'),
        id: {
          [Op.ne]: appUserModel.get('id'),
        },
      },
      transaction: options.transaction,
    });
    if (result) {
      throw new Error('手机号已经存在');
    }
  }
}
