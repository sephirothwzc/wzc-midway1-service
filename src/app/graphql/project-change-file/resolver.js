const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('projectChangeFile');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  ProjectChangeFile: {
    projectChangeIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'projectChange');
      return service.fetchById(_root.projectChangeId);
    },
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectId);
    },
  },
};
