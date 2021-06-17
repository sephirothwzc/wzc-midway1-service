const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('contract');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  Contract: {
    contractCollectionPaymentContractId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPayment');
      _.set(_args, 'param.where.contractId', _root.id);
      return service.findAll(_args.param);
    },
    contractCollectionPaymentPlanContractId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractCollectionPaymentPlan');
      _.set(_args, 'param.where.contractId', _root.id);
      return service.findAll(_args.param);
    },
    contractFileContractId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractFile');
      _.set(_args, 'param.where.contractId', _root.id);
      return service.findAll(_args.param);
    },
    projectIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'project');
      return service.fetchById(_root.projectId);
    },
    budgetIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'budget');
      return service.fetchById(_root.budgetId);
    },
    contractTypeIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.contractTypeId);
    },
    contractStatusIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.contractStatusId);
    },
    contractNatureIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'dataDictionary');
      return service.fetchById(_root.contractNatureId);
    },
    addUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.addUserId);
    },
    organizationIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'organization');
      return service.fetchById(_root.organizationId);
    },
    contractMeetingContractId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractMeeting');
      _.set(_args, 'param.where.contractId', _root.id);
      return service.findAll(_args.param);
    },
    contractSignContractId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'contractSign');
      _.set(_args, 'param.where.contractId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
