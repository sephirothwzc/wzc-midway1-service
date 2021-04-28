const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('dataDictionary');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  DataDictionary: {
    contractCollectionPaymentMode: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPayment');
      _.set(_args, 'param.where.mode', _root.id);
      return service.findAll(_args.param);
    },
    contractCollectionPaymentType: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPayment');
      _.set(_args, 'param.where.type', _root.id);
      return service.findAll(_args.param);
    },
    contractCollectionPaymentPlanMode: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPaymentPlan');
      _.set(_args, 'param.where.mode', _root.id);
      return service.findAll(_args.param);
    },
    contractCollectionPaymentPlanType: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPaymentPlan');
      _.set(_args, 'param.where.type', _root.id);
      return service.findAll(_args.param);
    },
    contractContractTypeId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      _.set(_args, 'param.where.contractTypeId', _root.id);
      return service.findAll(_args.param);
    },
    contractContractStatusId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      _.set(_args, 'param.where.contractStatusId', _root.id);
      return service.findAll(_args.param);
    },
    contractContractNatureId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contract');
      _.set(_args, 'param.where.contractNatureId', _root.id);
      return service.findAll(_args.param);
    },
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.parentId);
    },
    enterpriseEnterpriseTypeId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'enterprise');
      _.set(_args, 'param.where.enterpriseTypeId', _root.id);
      return service.findAll(_args.param);
    },
    projectHisProjectTypeId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      _.set(_args, 'param.where.projectTypeId', _root.id);
      return service.findAll(_args.param);
    },
    projectHisProjectSubjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      _.set(_args, 'param.where.projectSubjectId', _root.id);
      return service.findAll(_args.param);
    },
    projectHisProjectStatusId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      _.set(_args, 'param.where.projectStatusId', _root.id);
      return service.findAll(_args.param);
    },
    projectHisBuildNatureId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'projectHis');
      _.set(_args, 'param.where.buildNatureId', _root.id);
      return service.findAll(_args.param);
    },
    projectProjectTypeId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'project');
      _.set(_args, 'param.where.projectTypeId', _root.id);
      return service.findAll(_args.param);
    },
    projectProjectSubjectId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'project');
      _.set(_args, 'param.where.projectSubjectId', _root.id);
      return service.findAll(_args.param);
    },
    projectProjectStatusId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'project');
      _.set(_args, 'param.where.projectStatusId', _root.id);
      return service.findAll(_args.param);
    },
    projectBuildNatureId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'project');
      _.set(_args, 'param.where.buildNatureId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
