const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('webapiRole');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  WebapiRole: {
    roleIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'role');
      return service.fetchById(_root.roleId);
    },
    webapiIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'webapi');
      return service.fetchById(_root.webapiId);
    },
  },
};
