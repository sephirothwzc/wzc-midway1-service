const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('capitalAccount');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  CapitalAccount: {
    enterpriseIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'enterprise');
      return service.fetchById(_root.enterpriseId);
    },
    contractCollectionPaymentCollectionAccountId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPayment');
      _.set(_args, 'param.where.collectionAccountId', _root.id);
      return service.findAll(_args.param);
    },
    contractCollectionPaymentPaymentAccountId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPayment');
      _.set(_args, 'param.where.paymentAccountId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
