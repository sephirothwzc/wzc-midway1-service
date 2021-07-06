const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('projectChange');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ProjectChange: {
    projectChangeFileProjectChangeId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectChangeFile');
      _.set(_args, 'param.where.projectChangeId', _root.id);
      return service.findAll(_args.param);
    },
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'project');
      return service.fetchById(_root.projectId);
    },
    projectHisIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      return service.fetchById(_root.projectHisId);
    },
  },
};
