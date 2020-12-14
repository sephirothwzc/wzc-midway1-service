import * as _ from 'lodash';
import { provide } from 'midway';
import { Op, Transaction } from 'sequelize';
import { AppUserModel, APP_USER } from '../models/app-user.model';
import * as Bb from 'bluebird';

@provide('AppUserHook')
export class AppUserHook {
  async beforeCreate(
    appUserModel: AppUserModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (!appUserModel.phone) {
      throw new Error('请填写手机号');
    }
    const { havePhone, haveUserName } = await Bb.props({
      havePhone: AppUserModel.findOne({
        where: {
          [Op.or]: [
            {
              [APP_USER.USER_NAME]: appUserModel.phone,
            },
            {
              [APP_USER.PHONE]: appUserModel.phone,
            },
          ],
        },
        transaction: options.transaction,
      }),
      haveUserName: AppUserModel.findOne({
        where: {
          [Op.or]: [
            {
              [APP_USER.USER_NAME]: appUserModel.userName,
            },
            {
              [APP_USER.PHONE]: appUserModel.userName,
            },
          ],
        },
        transaction: options.transaction,
      }),
    });
    if (havePhone) {
      throw new Error('手机号已经存在');
    }
    if (haveUserName) {
      throw new Error('用户名已经存在');
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
    if (
      !changed.includes(APP_USER.PHONE) &&
      !changed.includes(APP_USER.USER_NAME)
    ) {
      return;
    }
    const { havePhone, haveUserName } = await Bb.prop({
      havePhone:
        changed.includes(APP_USER.PHONE) &&
        AppUserModel.findOne({
          where: {
            [Op.or]: [
              {
                [APP_USER.USER_NAME]: appUserModel.phone,
              },
              {
                [APP_USER.PHONE]: appUserModel.phone,
              },
            ],
          },
          transaction: options.transaction,
        }),
      haveUserName:
        changed.includes(APP_USER.USER_NAME) &&
        AppUserModel.findOne({
          where: {
            [Op.or]: [
              {
                [APP_USER.USER_NAME]: appUserModel.userName,
              },
              {
                [APP_USER.PHONE]: appUserModel.userName,
              },
            ],
          },
          transaction: options.transaction,
        }),
    });
    if (havePhone) {
      throw new Error('手机号已经存在');
    }
    if (haveUserName) {
      throw new Error('用户名已经存在');
    }
  }
}
