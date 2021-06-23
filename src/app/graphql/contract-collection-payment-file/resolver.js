const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contractCollectionPaymentFile');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ContractCollectionPaymentFile: {
    contractCollectionPaymentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contractCollectionPayment');
      return service.fetchById(_root.contractCollectionPaymentId);
    },
  },
};
