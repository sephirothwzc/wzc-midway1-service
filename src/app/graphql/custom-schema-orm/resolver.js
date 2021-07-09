const resolverUtil = require('../utils/resolver.util');
const { Query, getService } = resolverUtil('customSchemaOrm');
const _ = require('lodash');

module.exports = {
  Query,
  CustomSchemaOrm: {
    formCustomIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'formCustom');
      return service.fetchById(_root.formCustomId);
    },
    formCustomSchemaIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'formCustomSchema');
      return service.fetchById(_root.formCustomSchemaId);
    },
    workFlowGraph: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'customSchemaOrm');
      return service.workFlowGraph(_root);
    },
  },
};
