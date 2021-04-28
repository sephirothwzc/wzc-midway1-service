const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('projectHis');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  ProjectHis: {
    projectBudgetHisProjectHisId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectBudgetHis');
      _.set(_args, 'param.where.projectHisId', _root.id);
      return service.findAll(_args.param);
    },
    projectFileHisProjectHisId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectFileHis');
      _.set(_args, 'param.where.projectHisId', _root.id);
      return service.findAll(_args.param);
    },
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectId);
    },
    projectGroupIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'projectGroup');
      return service.fetchById(_root.projectGroupId);
    },
    projectTypeIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.projectTypeId);
    },
    projectSubjectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.projectSubjectId);
    },
    responsibleOrganizationIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'organization');
      return service.fetchById(_root.responsibleOrganizationId);
    },
    projectStatusIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.projectStatusId);
    },
    buildNatureIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.buildNatureId);
    },
    addUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.addUserId);
    },
  },
};
