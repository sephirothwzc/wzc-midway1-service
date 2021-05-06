const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('workFlow');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  WorkFlow: {
    formCustomIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'formCustom');
      return service.fetchById(_root.formCustomId);
    },
    workFlowOrmWorkFlowId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowOrm');
      _.set(_args, 'param.where.workFlowId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
