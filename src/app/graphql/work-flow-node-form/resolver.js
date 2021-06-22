const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('workFlowNodeForm');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  WorkFlowNodeForm: {
    formCustomIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'formCustom');
      return service.fetchById(_root.formCustomId);
    },
    formCustomSchemaIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'formCustomSchema');
      return service.fetchById(_root.formCustomSchemaId);
    },
  },
};
