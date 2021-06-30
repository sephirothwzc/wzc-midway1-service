const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('budgetAllocation');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  BudgetAllocation: {
    projectAidObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectAid);
    },
    budgetAidObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budget');
      return service.fetchById(_root.budgetAid);
    },
    projectBidObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectBid);
    },
    budgetBidObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budget');
      return service.fetchById(_root.budgetBid);
    },
    budgetBudgetAllocationId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'budget');
      _.set(_args, 'param.where.budgetAllocationId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
