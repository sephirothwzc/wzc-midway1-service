const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('projectBudgetHis');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ProjectBudgetHis: {
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectId);
    },
    projectHisIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'projectHis');
      return service.fetchById(_root.projectHisId);
    },
    budgetIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budget');
      return service.fetchById(_root.budgetId);
    },
  },
};