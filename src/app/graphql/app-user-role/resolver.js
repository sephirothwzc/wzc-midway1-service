const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('appUserRole');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  AppUserRole: {
    appUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.appUserId);
    },
  },
};
