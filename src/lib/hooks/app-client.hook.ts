import * as _ from 'lodash';
import { provide } from 'midway';
import { Transaction } from 'sequelize/types';
import { APP_USER, AppUserModel } from '../models/app-user.model';
import { APP_USER_ROLE, AppUserRoleModel } from '../models/app-user-role.model';
import { BUSINESS_RULE, BusinessRuleModel } from '../models/business-rule.model';
import { BUSINESS_SCHEMA, BusinessSchemaModel } from '../models/business-schema.model';
import { COMPONENT_CONTROLER, ComponentControlerModel } from '../models/component-controler.model';
import { COMPONENT_CONTROLER_ROLE, ComponentControlerRoleModel } from '../models/component-controler-role.model';
import { COMPONENT, ComponentModel } from '../models/component.model';
import { DATA_DICTIONARY, DataDictionaryModel } from '../models/data-dictionary.model';
import { FORM_CUSTOM, FormCustomModel } from '../models/form-custom.model';
import { ROLE_GROUP, RoleGroupModel } from '../models/role-group.model';
import { ROLE_GROUP_ITEM, RoleGroupItemModel } from '../models/role-group-item.model';
import { ROLE, RoleModel } from '../models/role.model';
import { ROUTER, RouterModel } from '../models/router.model';
import { ROUTER_ROLE, RouterRoleModel } from '../models/router-role.model';
import { SCHEMA_MODEL, SchemaModelModel } from '../models/schema-model.model';
import { SCHEMA_MODEL_ROLE, SchemaModelRoleModel } from '../models/schema-model-role.model';
import { WEBAPI, WebapiModel } from '../models/webapi.model';
import { WEBAPI_ROLE, WebapiRoleModel } from '../models/webapi-role.model';
import { WORK_FLOW, WorkFlowModel } from '../models/work-flow.model';
import * as Bb from 'bluebird';
import { AppClientModel } from '../models/app-client.model';

@provide('AppClientHook')
export class AppClientHook {

  async beforeDestroy(
    model: AppClientModel,
    options: { transaction: Transaction; validate: Boolean; returning: Boolean }
  ) {
    const { appUserIbfk1, appUserRoleIbfk1, businessRuleIbfk1, businessSchemaIbfk1, componentControlerIbfk1, componentControlerRoleIbfk1, componentIbfk1, dataDictionaryIbfk1, formCustomIbfk1, roleGroupIbfk1, roleGroupItemIbfk1, roleIbfk1, routerIbfk1, routerRoleIbfk1, schemaModelIbfk1, schemaModelRoleIbfk1, webapiIbfk1, webapiRoleIbfk1, workFlowIbfk1 } = await Bb.props({
        appUserIbfk1: AppUserModel.findOne({
          where: {
            [APP_USER.APP_ID]: model.get('id'),
          },
        }),
        appUserRoleIbfk1: AppUserRoleModel.findOne({
          where: {
            [APP_USER_ROLE.APP_ID]: model.get('id'),
          },
        }),
        businessRuleIbfk1: BusinessRuleModel.findOne({
          where: {
            [BUSINESS_RULE.APP_ID]: model.get('id'),
          },
        }),
        businessSchemaIbfk1: BusinessSchemaModel.findOne({
          where: {
            [BUSINESS_SCHEMA.APP_ID]: model.get('id'),
          },
        }),
        componentControlerIbfk1: ComponentControlerModel.findOne({
          where: {
            [COMPONENT_CONTROLER.APP_ID]: model.get('id'),
          },
        }),
        componentControlerRoleIbfk1: ComponentControlerRoleModel.findOne({
          where: {
            [COMPONENT_CONTROLER_ROLE.APP_ID]: model.get('id'),
          },
        }),
        componentIbfk1: ComponentModel.findOne({
          where: {
            [COMPONENT.APP_ID]: model.get('id'),
          },
        }),
        dataDictionaryIbfk1: DataDictionaryModel.findOne({
          where: {
            [DATA_DICTIONARY.APP_ID]: model.get('id'),
          },
        }),
        formCustomIbfk1: FormCustomModel.findOne({
          where: {
            [FORM_CUSTOM.APP_ID]: model.get('id'),
          },
        }),
        roleGroupIbfk1: RoleGroupModel.findOne({
          where: {
            [ROLE_GROUP.APP_ID]: model.get('id'),
          },
        }),
        roleGroupItemIbfk1: RoleGroupItemModel.findOne({
          where: {
            [ROLE_GROUP_ITEM.APP_ID]: model.get('id'),
          },
        }),
        roleIbfk1: RoleModel.findOne({
          where: {
            [ROLE.APP_ID]: model.get('id'),
          },
        }),
        routerIbfk1: RouterModel.findOne({
          where: {
            [ROUTER.APP_ID]: model.get('id'),
          },
        }),
        routerRoleIbfk1: RouterRoleModel.findOne({
          where: {
            [ROUTER_ROLE.APP_ID]: model.get('id'),
          },
        }),
        schemaModelIbfk1: SchemaModelModel.findOne({
          where: {
            [SCHEMA_MODEL.APP_ID]: model.get('id'),
          },
        }),
        schemaModelRoleIbfk1: SchemaModelRoleModel.findOne({
          where: {
            [SCHEMA_MODEL_ROLE.APP_ID]: model.get('id'),
          },
        }),
        webapiIbfk1: WebapiModel.findOne({
          where: {
            [WEBAPI.APP_ID]: model.get('id'),
          },
        }),
        webapiRoleIbfk1: WebapiRoleModel.findOne({
          where: {
            [WEBAPI_ROLE.APP_ID]: model.get('id'),
          },
        }),
        workFlowIbfk1: WorkFlowModel.findOne({
          where: {
            [WORK_FLOW.APP_ID]: model.get('id'),
          },
        }),
    });
    if (appUserIbfk1 || appUserRoleIbfk1 || businessRuleIbfk1 || businessSchemaIbfk1 || componentControlerIbfk1 || componentControlerRoleIbfk1 || componentIbfk1 || dataDictionaryIbfk1 || formCustomIbfk1 || roleGroupIbfk1 || roleGroupItemIbfk1 || roleIbfk1 || routerIbfk1 || routerRoleIbfk1 || schemaModelIbfk1 || schemaModelRoleIbfk1 || webapiIbfk1 || webapiRoleIbfk1 || workFlowIbfk1) {
      throw new Error('已使用数据禁止删除');
    }
  }


}
