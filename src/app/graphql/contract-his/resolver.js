const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('contractHis');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  ContractHis: {
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contract');
      return service.fetchById(_root.contractId);
    },
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectId);
    },
    budgetIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budget');
      return service.fetchById(_root.budgetId);
    },
    contractTypeIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.contractTypeId);
    },
    contractStatusIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.contractStatusId);
    },
    contractNatureIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.contractNatureId);
    },
    addUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.addUserId);
    },
    organizationIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'organization');
      return service.fetchById(_root.organizationId);
    },
  },
};
