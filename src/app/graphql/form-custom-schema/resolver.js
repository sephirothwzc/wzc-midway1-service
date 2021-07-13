const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('formCustomSchema');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  FormCustomSchema: {
    formCustomIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'formCustom');
      return service.fetchById(_root.formCustomId);
    },
    schemaOrmFormCustomSchemaId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'schemaOrm');
      _.set(_args, 'param.where.formCustomSchemaId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowNodeFormFormCustomSchemaId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowNodeForm');
      _.set(_args, 'param.where.formCustomSchemaId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowOrmFormCustomSchemaId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowOrm');
      _.set(_args, 'param.where.formCustomSchemaId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
