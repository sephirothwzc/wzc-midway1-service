const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('appUserRole');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  AppUserRole: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    appUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.appUserId);
    },
  },
};
