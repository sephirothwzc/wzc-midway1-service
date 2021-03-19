const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('appUser');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  AppUser: {
    appUserRoleAppUserId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUserRole');
      _.set(_args, 'param.where.appUserId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
