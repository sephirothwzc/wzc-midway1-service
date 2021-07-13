import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { COMPONENT_CONTROLER, ComponentControlerModel } from '../models/component-controler.model';
import { COMPONENT_CONTROLER_ROLE, ComponentControlerRoleModel } from '../models/component-controler-role.model';
import * as Bb from 'bluebird';

@provide('ComponentControlerHook')
export class ComponentControlerHook {

  async beforeDestroy(
    model: ComponentControlerModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { componentControlerIbfk2, componentControlerRoleIbfk3 } = await Bb.props({
        componentControlerIbfk2: ComponentControlerModel.findOne({
          where: {
            [COMPONENT_CONTROLER.PARENT_ID]: model.get('id'),
          },
        }),
        componentControlerRoleIbfk3: ComponentControlerRoleModel.findOne({
          where: {
            [COMPONENT_CONTROLER_ROLE.COMPONENT_CONTROLER_ID]: model.get('id'),
          },
        }),
    });
    if (componentControlerIbfk2 || componentControlerRoleIbfk3) {
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

    if (changed.includes(COMPONENT_CONTROLER.CONTROL_CODE) && model.get('controlCode')) {
      const item0 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_CODE]: model.get('controlCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('控件名称已存在');
      }
    }
    

    if (changed.includes(COMPONENT_CONTROLER.CONTROL_KEY) && model.get('controlKey')) {
      const item1 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_KEY]: model.get('controlKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('控件唯一约束key已存在');
      }
    }
    

    if (changed.includes(COMPONENT_CONTROLER.CONTROL_NAME) && model.get('controlName')) {
      const item2 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_NAME]: model.get('controlName'),
        },
        transaction: options?.transaction,
      });
      if (item2) {
        throw new Error('控件名称已存在');
      }
    }
    
  }

  async beforeCreate(
    model: ComponentControlerModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('controlCode')) {
      const item0 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_CODE]: model.get('controlCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('控件名称已存在');
      }
    }
    

    if (model.get('controlKey')) {
      const item1 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_KEY]: model.get('controlKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('控件唯一约束key已存在');
      }
    }
    

    if (model.get('controlName')) {
      const item2 = await ComponentControlerModel.findOne({
        where: {
          [COMPONENT_CONTROLER.CONTROL_NAME]: model.get('controlName'),
        },
        transaction: options?.transaction,
      });
      if (item2) {
        throw new Error('控件名称已存在');
      }
    }
    
  }
  
}
