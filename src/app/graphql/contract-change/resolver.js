const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contractChange');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ContractChange: {
    contractHisIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractHis');
      return service.fetchById(_root.contractHisId);
    },
    contractChangeFileContractChangeId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractChangeFile');
      _.set(_args, 'param.where.contractChangeId', _root.id);
      return service.findAll(_args.param);
    },
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      return service.fetchById(_root.contractId);
    },
  },
};
