const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('formCustom');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  FormCustom: {
    formCustomSchemaFormCustomId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'formCustomSchema');
      _.set(_args, 'param.where.formCustomId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
