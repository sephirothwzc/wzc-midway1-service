import * as _ from 'lodash';
import { provide } from 'midway';
import { Op, Transaction } from 'sequelize';
import { APP_USER_ROLE, AppUserRoleModel } from '../models/app-user-role.model';
import { CONTRACT, ContractModel } from '../models/contract.model';
import { PROJECT_HIS, ProjectHisModel } from '../models/project-his.model';
import { PROJECT, ProjectModel } from '../models/project.model';
import {
  WORK_FLOW_ORM_USER,
  WorkFlowOrmUserModel,
} from '../models/work-flow-orm-user.model';
import * as Bb from 'bluebird';
import { AppUserModel, APP_USER } from '../models/app-user.model';

@provide('AppUserHook')
export class AppUserHook {
  async beforeDestroy(
    model: AppUserModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const {
      appUserRoleIbfk1,
      contractIbfk6,
      projectHisIbfk8,
      projectIbfk7,
      workFlowOrmUserIbfk1,
      workFlowOrmUserIbfk2,
      workFlowOrmUserIbfk3,
      workFlowOrmUserIbfk4,
    } = await Bb.props({
      appUserRoleIbfk1: AppUserRoleModel.findOne({
        where: {
          [APP_USER_ROLE.APP_USER_ID]: model.get('id'),
        },
      }),
      contractIbfk6: ContractModel.findOne({
        where: {
          [CONTRACT.ADD_USER_ID]: model.get('id'),
        },
      }),
      projectHisIbfk8: ProjectHisModel.findOne({
        where: {
          [PROJECT_HIS.ADD_USER_ID]: model.get('id'),
        },
      }),
      projectIbfk7: ProjectModel.findOne({
        where: {
          [PROJECT.ADD_USER_ID]: model.get('id'),
        },
      }),
      workFlowOrmUserIbfk1: WorkFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.WORK_FLOW_ORM_ID]: model.get('id'),
        },
      }),
      workFlowOrmUserIbfk2: WorkFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.FORM_USER_ID]: model.get('id'),
        },
      }),
      workFlowOrmUserIbfk3: WorkFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.MANAGER_USER_ID]: model.get('id'),
        },
      }),
      workFlowOrmUserIbfk4: WorkFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.UNDERTAKE_USER_ID]: model.get('id'),
        },
      }),
    });
    if (
      appUserRoleIbfk1 ||
      contractIbfk6 ||
      projectHisIbfk8 ||
      projectIbfk7 ||
      workFlowOrmUserIbfk1 ||
      workFlowOrmUserIbfk2 ||
      workFlowOrmUserIbfk3 ||
      workFlowOrmUserIbfk4
    ) {
      throw new Error('已使用数据禁止删除');
    }
  }

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
      haveUserName:
        appUserModel.userName &&
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
    const { havePhone, haveUserName } = await Bb.props({
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
