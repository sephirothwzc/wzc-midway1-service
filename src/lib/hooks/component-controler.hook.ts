import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import {
  COMPONENT_CONTROLER,
  ComponentControlerModel,
} from '../models/component-controler.model';
import {
  COMPONENT_CONTROLER_ROLE,
  ComponentControlerRoleModel,
} from '../models/component-controler-role.model';
import * as Bb from 'bluebird';

@provide('ComponentControlerHook')
export class ComponentControlerHook {
  async beforeBulkDestroy(model: {
    where: { id: string };
    transaction: Transaction;
  }) {
    const {
      componentControlerIbfk1,
      componentControlerRoleIbfk2,
    } = await Bb.props({
      componentControlerIbfk1: ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.PARENT_ID]: _.get(model, 'where.id'),
        },
      }),
      componentControlerRoleIbfk2: ComponentControlerRoleModel.findOne({
        where: {
          [COMPONENT_CONTROLER_ROLE.COMPONENT_CONTROLER_ID]: _.get(
            model,
            'where.id'
          ),
        },
      }),
    });
    if (componentControlerIbfk1 || componentControlerRoleIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }

  async beforeUpdate(
    model: ComponentControlerModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (
      changed.includes(COMPONENT_CONTROLER.CONTROL_CODE) &&
      model.get('ControlCode')
    ) {
      const item0 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_CODE]: model.get('ControlCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('控件名称[unique]已存在');
      }
    }

    if (
      changed.includes(COMPONENT_CONTROLER.CONTROL_KEY) &&
      model.get('ControlKey')
    ) {
      const item1 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_KEY]: model.get('ControlKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('控件唯一约束key[unique]已存在');
      }
    }

    if (
      changed.includes(COMPONENT_CONTROLER.CONTROL_NAME) &&
      model.get('ControlName')
    ) {
      const item2 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_NAME]: model.get('ControlName'),
        },
        transaction: options?.transaction,
      });
      if (item2) {
        throw new Error('控件名称[unique]已存在');
      }
    }
  }

  async beforeCreate(
    model: ComponentControlerModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    if (model.get('ControlCode')) {
      const item0 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_CODE]: model.get('ControlCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('控件名称[unique]已存在');
      }
    }

    if (model.get('ControlKey')) {
      const item1 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_KEY]: model.get('ControlKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('控件唯一约束key[unique]已存在');
      }
    }

    if (model.get('ControlName')) {
      const item2 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_NAME]: model.get('ControlName'),
        },
        transaction: options?.transaction,
      });
      if (item2) {
        throw new Error('控件名称[unique]已存在');
      }
    }
  }
}
