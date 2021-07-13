const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('appUser');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  AppUser: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    appUserRoleAppUserId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUserRole');
      _.set(_args, 'param.where.appUserId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowOrmCreateWorkId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowOrm');
      _.set(_args, 'param.where.createWorkId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowOrmUserFormUserId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowOrmUser');
      _.set(_args, 'param.where.formUserId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowOrmUserHandleUserId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowOrmUser');
      _.set(_args, 'param.where.handleUserId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
