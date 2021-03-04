const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('schemaModel');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  SchemaModel: {
    businessSchemaSchemaModelId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'businessSchema');
      _.set(_args, 'param.where.schemaModelId', _root.id);
      return service.findAll(_args.param);
    },
    parentIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'schemaModel');
      return service.fetchById(_root.parentId);
    },
    schemaModelRoleSchemaModelId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'schemaModelRole');
      _.set(_args, 'param.where.schemaModelId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
