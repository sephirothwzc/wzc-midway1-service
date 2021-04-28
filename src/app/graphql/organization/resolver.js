const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('organization');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  Organization: {
    budgetDepartment: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'budget');
      _.set(_args, 'param.where.department', _root.id);
      return service.findAll(_args.param);
    },
    contractOrganizationId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      _.set(_args, 'param.where.organizationId', _root.id);
      return service.findAll(_args.param);
    },
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'organization');
      return service.fetchById(_root.parentId);
    },
    projectHisResponsibleOrganizationId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      _.set(_args, 'param.where.responsibleOrganizationId', _root.id);
      return service.findAll(_args.param);
    },
    projectResponsibleOrganizationId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'project');
      _.set(_args, 'param.where.responsibleOrganizationId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
