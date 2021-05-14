import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { COMPONENT_CONTROLER, ComponentControlerModel } from '../models/component-controler.model';
import { COMPONENT, ComponentModel } from '../models/component.model';
import { ROUTER, RouterModel } from '../models/router.model';
import * as Bb from 'bluebird';

@provide('ComponentHook')
export class ComponentHook {

  async beforeDestroy(
    model: ComponentModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { componentControlerIbfk2, componentIbfk1, routerIbfk2 } = await Bb.props({
        componentControlerIbfk2: ComponentControlerModel.findOne({
          where: {
            [COMPONENT_CONTROLER.COMPONENT_ID]: model.get('id'),
          },
        }),
        componentIbfk1: ComponentModel.findOne({
          where: {
            [COMPONENT.PARENT_ID]: model.get('id'),
          },
        }),
        routerIbfk2: RouterModel.findOne({
          where: {
            [ROUTER.COMPONENT_ID]: model.get('id'),
          },
        }),
    });
    if (componentControlerIbfk2 || componentIbfk1 || routerIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


  async beforeUpdate(
    model: ComponentModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const changed = model.changed();
    if (!changed) {
      return;
    }

    if (changed.includes(COMPONENT.COMPONENT_CODE) && model.get('componentCode')) {
      const item0 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_CODE]: model.get('componentCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组件名称已存在');
      }
    }
    

    if (changed.includes(COMPONENT.COMPONENT_KEY) && model.get('componentKey')) {
      const item1 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_KEY]: model.get('componentKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('组件唯一约束key已存在');
      }
    }
    

    if (changed.includes(COMPONENT.COMPONENT_NAME) && model.get('componentName')) {
      const item2 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_NAME]: model.get('componentName'),
        },
        transaction: options?.transaction,
      });
      if (item2) {
        throw new Error('组件名称已存在');
      }
    }
    
  }

  async beforeCreate(
    model: ComponentModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {

    if (model.get('componentCode')) {
      const item0 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_CODE]: model.get('componentCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组件名称已存在');
      }
    }
    

    if (model.get('componentKey')) {
      const item1 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_KEY]: model.get('componentKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('组件唯一约束key已存在');
      }
    }
    

    if (model.get('componentName')) {
      const item2 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_NAME]: model.get('componentName'),
        },
        transaction: options?.transaction,
      });
      if (item2) {
        throw new Error('组件名称已存在');
      }
    }
    
  }
  
}
