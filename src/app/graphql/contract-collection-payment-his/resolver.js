const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('contractCollectionPaymentHis');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  ContractCollectionPaymentHis: {
    contractCollectionPaymentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contractCollectionPayment');
      return service.fetchById(_root.contractCollectionPaymentId);
    },
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contract');
      return service.fetchById(_root.contractId);
    },
    contractCollectionPlanIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contractCollectionPaymentPlan');
      return service.fetchById(_root.contractCollectionPlanId);
    },
    collectionAccountIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'capitalAccount');
      return service.fetchById(_root.collectionAccountId);
    },
    paymentAccountIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'capitalAccount');
      return service.fetchById(_root.paymentAccountId);
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
