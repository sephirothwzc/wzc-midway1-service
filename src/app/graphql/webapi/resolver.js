const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('webapi');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  Webapi: {
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'webapi');
      return service.fetchById(_root.parentId);
    },
    webapiRoleWebapiId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'webapiRole');
      _.set(_args, 'param.where.webapiId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
