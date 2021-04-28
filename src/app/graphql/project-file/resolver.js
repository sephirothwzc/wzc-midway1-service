const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('projectFile');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ProjectFile: {
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectId);
    },
  },
};
