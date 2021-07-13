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
import { RoleModel } from '../models/role.model';

@provide('RoleHook')
export class RoleHook {

  async beforeDestroy(
    model: RoleModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { businessSchemaIbfk2, componentControlerRoleIbfk2, roleGroupItemIbfk2, routerRoleIbfk2, schemaModelRoleIbfk2, webapiRoleIbfk2 } = await Bb.props({
        businessSchemaIbfk2: BusinessSchemaModel.findOne({
          where: {
            [BUSINESS_SCHEMA.ROLE_ID]: model.get('id'),
          },
        }),
        componentControlerRoleIbfk2: ComponentControlerRoleModel.findOne({
          where: {
            [COMPONENT_CONTROLER_ROLE.ROLE_ID]: model.get('id'),
          },
        }),
        roleGroupItemIbfk2: RoleGroupItemModel.findOne({
          where: {
            [ROLE_GROUP_ITEM.ROLE_ID]: model.get('id'),
          },
        }),
        routerRoleIbfk2: RouterRoleModel.findOne({
          where: {
            [ROUTER_ROLE.ROLE_ID]: model.get('id'),
          },
        }),
        schemaModelRoleIbfk2: SchemaModelRoleModel.findOne({
          where: {
            [SCHEMA_MODEL_ROLE.ROLE_ID]: model.get('id'),
          },
        }),
        webapiRoleIbfk2: WebapiRoleModel.findOne({
          where: {
            [WEBAPI_ROLE.ROLE_ID]: model.get('id'),
          },
        }),
    });
    if (businessSchemaIbfk2 || componentControlerRoleIbfk2 || roleGroupItemIbfk2 || routerRoleIbfk2 || schemaModelRoleIbfk2 || webapiRoleIbfk2) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
