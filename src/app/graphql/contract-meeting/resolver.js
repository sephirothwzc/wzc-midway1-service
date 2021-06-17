const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contractMeeting');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ContractMeeting: {
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contract');
      return service.fetchById(_root.contractId);
    },
  },
};
