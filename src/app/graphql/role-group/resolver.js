const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('roleGroup');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  RoleGroup: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    roleGroupItemRoleGroupId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'roleGroupItem');
      _.set(_args, 'param.where.roleGroupId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
