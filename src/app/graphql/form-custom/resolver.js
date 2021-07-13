const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('formCustom');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  FormCustom: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appClient');
      return service.fetchById(_root.appId);
    },
    formCustomSchemaFormCustomId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'formCustomSchema');
      _.set(_args, 'param.where.formCustomId', _root.id);
      return service.findAll(_args.param);
    },
    schemaOrmFormCustomId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'schemaOrm');
      _.set(_args, 'param.where.formCustomId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowFormCustomId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlow');
      _.set(_args, 'param.where.formCustomId', _root.id);
      return service.findAll(_args.param);
    },
    workFlowNodeFormFormCustomId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowNodeForm');
      _.set(_args, 'param.where.formCustomId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
