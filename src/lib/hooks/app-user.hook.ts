import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
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
}
