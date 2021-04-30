const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('budgetFile');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  BudgetFile: {
    budgetIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budget');
      return service.fetchById(_root.budgetId);
    },
  },
};