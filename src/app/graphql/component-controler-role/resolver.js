const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('componentControlerRole');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  ComponentControlerRole: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    roleIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'role');
      return service.fetchById(_root.roleId);
    },
    componentControlerIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'componentControler');
      return service.fetchById(_root.componentControlerId);
    },
  },
};
