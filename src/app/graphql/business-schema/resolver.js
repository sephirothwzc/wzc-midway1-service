const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('businessSchema');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  BusinessSchema: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    roleIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'role');
      return service.fetchById(_root.roleId);
    },
    businessRuleIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'businessRule');
      return service.fetchById(_root.businessRuleId);
    },
    schemaModelIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'schemaModel');
      return service.fetchById(_root.schemaModelId);
    },
  },
};
