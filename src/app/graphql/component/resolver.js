const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('component');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  Component: {
    componentControlerComponentId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'componentControler');
      _.set(_args, 'param.where.componentId', _root.id);
      return service.findAll(_args.param);
    },
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'component');
      return service.fetchById(_root.parentId);
    },
    routerComponentId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'router');
      _.set(_args, 'param.where.componentId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
