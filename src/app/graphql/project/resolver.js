const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('project');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  Project: {
    budgetAllocationProjectAid: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'budgetAllocation');
      _.set(_args, 'param.where.projectAid', _root.id);
      return service.findAll(_args.param);
    },
    budgetAllocationProjectBid: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'budgetAllocation');
      _.set(_args, 'param.where.projectBid', _root.id);
      return service.findAll(_args.param);
    },
    contractHisProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractHis');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    contractProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectBudgetHisProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectBudgetHis');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectHisProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectBudgetProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectBudget');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectChangeFileProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectChangeFile');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectChangeProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectChange');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectFileHisProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectFileHis');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectFileProjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectFile');
      _.set(_args, 'param.where.projectId', _root.id);
      return service.findAll(_args.param);
    },
    projectGroupIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectGroup');
      return service.fetchById(_root.projectGroupId);
    },
    projectTypeIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'dataDictionary');
      return service.fetchById(_root.projectTypeId);
    },
    projectSubjectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'dataDictionary');
      return service.fetchById(_root.projectSubjectId);
    },
    responsibleOrganizationIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'organization');
      return service.fetchById(_root.responsibleOrganizationId);
    },
    projectStatusIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'dataDictionary');
      return service.fetchById(_root.projectStatusId);
    },
    buildNatureIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'dataDictionary');
      return service.fetchById(_root.buildNatureId);
    },
    addUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUser');
      return service.fetchById(_root.addUserId);
    },
  },
};
