import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { BUSINESS_SCHEMA, BusinessSchemaModel } from '../models/business-schema.model';
import { COMPONENT_CONTROLER_ROLE, ComponentControlerRoleModel } from '../models/component-controler-role.model';
import { ROLE_GROUP_ITEM, RoleGroupItemModel } from '../models/role-group-item.model';
import { ROUTER_ROLE, RouterRoleModel } from '../models/router-role.model';
import { SCHEMA_MODEL_ROLE, SchemaModelRoleModel } from '../models/schema-model-role.model';
import { WEBAPI_ROLE, WebapiRoleModel } from '../models/webapi-role.model';
import * as Bb from 'bluebird';

@provide('RoleHook')
export class RoleHook {

  async beforeBulkDestroy(model: { where: {id: string}; transaction: Transaction }) {
    const { businessSchemaIbfk1, componentControlerRoleIbfk1, roleGroupItemIbfk1, routerRoleIbfk1, schemaModelRoleIbfk1, webapiRoleIbfk1 } = await Bb.props({
        businessSchemaIbfk1: BusinessSchemaModel.findOne({
          where: {
            [BUSINESS_SCHEMA.ROLE_ID]: _.get(model, 'where.id'),
          },
        }),
        componentControlerRoleIbfk1: ComponentControlerRoleModel.findOne({
          where: {
            [COMPONENT_CONTROLER_ROLE.ROLE_ID]: _.get(model, 'where.id'),
          },
        }),
        roleGroupItemIbfk1: RoleGroupItemModel.findOne({
          where: {
            [ROLE_GROUP_ITEM.ROLE_ID]: _.get(model, 'where.id'),
          },
        }),
        routerRoleIbfk1: RouterRoleModel.findOne({
          where: {
            [ROUTER_ROLE.ROLE_ID]: _.get(model, 'where.id'),
          },
        }),
        schemaModelRoleIbfk1: SchemaModelRoleModel.findOne({
          where: {
            [SCHEMA_MODEL_ROLE.ROLE_ID]: _.get(model, 'where.id'),
          },
        }),
        webapiRoleIbfk1: WebapiRoleModel.findOne({
          where: {
            [WEBAPI_ROLE.ROLE_ID]: _.get(model, 'where.id'),
          },
        }),
    });
    if (businessSchemaIbfk1 || componentControlerRoleIbfk1 || roleGroupItemIbfk1 || routerRoleIbfk1 || schemaModelRoleIbfk1 || webapiRoleIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
