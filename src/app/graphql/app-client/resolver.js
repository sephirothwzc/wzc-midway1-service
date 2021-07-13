const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('appClient');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  AppClient: {
    appUserAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUser');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    appUserRoleAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUserRole');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    businessRuleAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'businessRule');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    businessSchemaAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'businessSchema');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    componentControlerAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'componentControler');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    componentControlerRoleAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'componentControlerRole');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    componentAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'component');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    dataDictionaryAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'dataDictionary');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    formCustomAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'formCustom');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    roleGroupAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'roleGroup');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    roleGroupItemAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'roleGroupItem');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    roleAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'role');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    routerAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'router');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    routerRoleAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'routerRole');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    schemaModelAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'schemaModel');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    schemaModelRoleAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'schemaModelRole');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    webapiAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'webapi');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    webapiRoleAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'webapiRole');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowAppId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlow');
      _.set(_args, 'param.where.appId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
