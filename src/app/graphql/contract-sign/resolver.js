const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contractSign');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ContractSign: {
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contract');
      return service.fetchById(_root.contractId);
    },
    enterpriseIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'enterprise');
      return service.fetchById(_root.enterpriseId);
    },
  },
};
