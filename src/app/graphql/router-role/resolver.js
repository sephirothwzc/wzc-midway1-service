const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('routerRole');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  RouterRole: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    roleIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'role');
      return service.fetchById(_root.roleId);
    },
    routerIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'router');
      return service.fetchById(_root.routerId);
    },
  },
};
