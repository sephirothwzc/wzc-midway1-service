const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('componentControler');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  ComponentControler: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'componentControler');
      return service.fetchById(_root.parentId);
    },
    componentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'component');
      return service.fetchById(_root.componentId);
    },
    componentControlerRoleComponentControlerId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'componentControlerRole');
      _.set(_args, 'param.where.componentControlerId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
