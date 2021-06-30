const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('budget');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  Budget: {
    budgetAllocationBudgetAid: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'budgetAllocation');
      _.set(_args, 'param.where.budgetAid', _root.id);
      return service.findAll(_args.param);
    },
    budgetAllocationBudgetBid: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'budgetAllocation');
      _.set(_args, 'param.where.budgetBid', _root.id);
      return service.findAll(_args.param);
    },
    budgetAllocationIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budgetAllocation');
      return service.fetchById(_root.budgetAllocationId);
    },
    budgetFileBudgetId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'budgetFile');
      _.set(_args, 'param.where.budgetId', _root.id);
      return service.findAll(_args.param);
    },
    departmentObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'organization');
      return service.fetchById(_root.department);
    },
    contractBudgetId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      _.set(_args, 'param.where.budgetId', _root.id);
      return service.findAll(_args.param);
    },
    projectBudgetHisBudgetId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectBudgetHis');
      _.set(_args, 'param.where.budgetId', _root.id);
      return service.findAll(_args.param);
    },
    projectBudgetBudgetId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectBudget');
      _.set(_args, 'param.where.budgetId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
