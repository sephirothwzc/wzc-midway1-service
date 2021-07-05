const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('contractCollectionPaymentPlanHis');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  ContractCollectionPaymentPlanHis: {
    contractCollectionPaymentPlanIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contractCollectionPaymentPlan');
      return service.fetchById(_root.contractCollectionPaymentPlanId);
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
