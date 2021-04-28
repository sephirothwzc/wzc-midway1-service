const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('projectGroup');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ProjectGroup: {
    projectHisProjectGroupId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      _.set(_args, 'param.where.projectGroupId', _root.id);
      return service.findAll(_args.param);
    },
    projectProjectGroupId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'project');
      _.set(_args, 'param.where.projectGroupId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
