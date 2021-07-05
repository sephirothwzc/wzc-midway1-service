const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contractFileHis');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ContractFileHis: {
    contractFileIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractFile');
      return service.fetchById(_root.contractFileId);
    },
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      return service.fetchById(_root.contractId);
    },
  },
};
