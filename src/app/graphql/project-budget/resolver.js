const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('projectBudget');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ProjectBudget: {
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectId);
    },
    budgetIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budget');
      return service.fetchById(_root.budgetId);
    },
  },
};
