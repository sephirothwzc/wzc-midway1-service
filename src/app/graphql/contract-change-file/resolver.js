const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contractChangeFile');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ContractChangeFile: {
    contractChangeIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractChange');
      return service.fetchById(_root.contractChangeId);
    },
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      return service.fetchById(_root.contractId);
    },
  },
};
