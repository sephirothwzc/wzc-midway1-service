const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('schemaModelRole');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  SchemaModelRole: {
    roleIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'role');
      return service.fetchById(_root.roleId);
    },
    schemaModelIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'schemaModel');
      return service.fetchById(_root.schemaModelId);
    },
  },
};