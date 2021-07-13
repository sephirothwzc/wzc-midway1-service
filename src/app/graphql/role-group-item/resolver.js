const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('roleGroupItem');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  RoleGroupItem: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    roleIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'role');
      return service.fetchById(_root.roleId);
    },
    roleGroupIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'roleGroup');
      return service.fetchById(_root.roleGroupId);
    },
  },
};
