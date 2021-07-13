const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('router');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  Router: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'router');
      return service.fetchById(_root.parentId);
    },
    componentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'component');
      return service.fetchById(_root.componentId);
    },
    routerRoleRouterId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'routerRole');
      _.set(_args, 'param.where.routerId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
