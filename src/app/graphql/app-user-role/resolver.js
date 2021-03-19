const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('appUserRole');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  AppUserRole: {
    appUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUser');
      return service.fetchById(_root.appUserId);
    },
    typeIdModel: async (_root, _args, ctx, _info) => {
      if (!_root.roleType || _root.roleType === 'none') {
        return {};
      }
      const service = await getService(ctx, _root.roleType);
      return service.fetchById(_root.typeId);
    },
  },
  TypeIdModel: {
    __resolveType: (obj, context, info) => {
      const name = _.get(obj, '_modelOptions.name.plural', '');
      return name.replace('Models', '');
    },
  },
};
