import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { COMPONENT_CONTROLER, ComponentControlerModel } from '../models/component-controler.model';
import { COMPONENT, ComponentModel } from '../models/component.model';
import { ROUTER, RouterModel } from '../models/router.model';
import * as Bb from 'bluebird';

@provide('ComponentHook')
export class ComponentHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { componentControlerIbfk2, componentIbfk1, routerIbfk2 } = await Bb.props({
        componentControlerIbfk2: ComponentControlerModel.findOne({
          where: {
            [COMPONENT_CONTROLER.COMPONENT_ID]: _.get(model, 'where.id'),
          },
        }),
        componentIbfk1: ComponentModel.findOne({
          where: {
            [COMPONENT.PARENT_ID]: _.get(model, 'where.id'),
          },
        }),
        routerIbfk2: RouterModel.findOne({
          where: {
            [ROUTER.COMPONENT_ID]: _.get(model, 'where.id'),
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

    if (changed.includes(COMPONENT.COMPONENT_CODE) && model.get('ComponentCode')) {
      const item0 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_CODE]: model.get('ComponentCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组件名称已存在');
      }
    }
    

    if (changed.includes(COMPONENT.COMPONENT_KEY) && model.get('ComponentKey')) {
      const item1 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_KEY]: model.get('ComponentKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('组件唯一约束key已存在');
      }
    }
    

    if (changed.includes(COMPONENT.COMPONENT_NAME) && model.get('ComponentName')) {
      const item2 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_NAME]: model.get('ComponentName'),
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

    if (model.get('ComponentCode')) {
      const item0 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_CODE]: model.get('ComponentCode'),
        },
        transaction: options?.transaction,
      });
      if (item0) {
        throw new Error('组件名称已存在');
      }
    }
    

    if (model.get('ComponentKey')) {
      const item1 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_KEY]: model.get('ComponentKey'),
        },
        transaction: options?.transaction,
      });
      if (item1) {
        throw new Error('组件唯一约束key已存在');
      }
    }
    

    if (model.get('ComponentName')) {
      const item2 = await ComponentModel.findOne({
        where: {
          [COMPONENT.COMPONENT_NAME]: model.get('ComponentName'),
        },
        transaction: options?.transaction,
      });
      if (item2) {
        throw new Error('组件名称已存在');
      }
    }
    
  }
  
}
