const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('enterprise');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  Enterprise: {
    capitalAccountEnterpriseId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'capitalAccount');
      _.set(_args, 'param.where.enterpriseId', _root.id);
      return service.findAll(_args.param);
    },
    contractSignEnterpriseId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractSign');
      _.set(_args, 'param.where.enterpriseId', _root.id);
      return service.findAll(_args.param);
    },
    enterpriseTypeIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.enterpriseTypeId);
    },
  },
};
