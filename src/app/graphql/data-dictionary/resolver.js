const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('dataDictionary');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  DataDictionary: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.parentId);
    },
  },
};
