const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contractCollectionPaymentPlan');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ContractCollectionPaymentPlan: {
    contractCollectionPaymentContractCollectionPlanId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPayment');
      _.set(_args, 'param.where.contractCollectionPlanId', _root.id);
      return service.findAll(_args.param);
    },
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contract');
      return service.fetchById(_root.contractId);
    },
    modeObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.mode);
    },
    typeObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.type);
    },
  },
};
