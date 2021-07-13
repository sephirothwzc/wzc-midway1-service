import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { APP_USER_ROLE, AppUserRoleModel } from '../models/app-user-role.model';
import { WORK_FLOW_ORM, WorkFlowOrmModel } from '../models/work-flow-orm.model';
import {
  WORK_FLOW_ORM_USER,
  WorkFlowOrmUserModel,
} from '../models/work-flow-orm-user.model';
import * as Bb from 'bluebird';
import { AppUserModel } from '../models/app-user.model';

@provide('AppUserHook')
export class AppUserHook {
  async beforeDestroy(
    model: AppUserModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const {
      appUserRoleIbfk2,
      workFlowOrmIbfk2,
      workFlowOrmUserIbfk2,
      workFlowOrmUserIbfk3,
    } = await Bb.props({
      appUserRoleIbfk2: AppUserRoleModel.findOne({
        where: {
          [APP_USER_ROLE.APP_USER_ID]: model.get('id'),
        },
      }),
      workFlowOrmIbfk2: WorkFlowOrmModel.findOne({
        where: {
          [WORK_FLOW_ORM.CREATE_WORK_ID]: model.get('id'),
        },
      }),
      workFlowOrmUserIbfk2: WorkFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.FORM_USER_ID]: model.get('id'),
        },
      }),
      workFlowOrmUserIbfk3: WorkFlowOrmUserModel.findOne({
        where: {
          [WORK_FLOW_ORM_USER.HANDLE_USER_ID]: model.get('id'),
        },
      }),
    });
    if (
      appUserRoleIbfk2 ||
      workFlowOrmIbfk2 ||
      workFlowOrmUserIbfk2 ||
      workFlowOrmUserIbfk3
    ) {
      throw new Error('已使用数据禁止删除');
    }
  }
}
