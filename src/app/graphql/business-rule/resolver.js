const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('businessRule');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  BusinessRule: {
    appIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appClient');
      return service.fetchById(_root.appId);
    },
    businessSchemaBusinessRuleId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'businessSchema');
      _.set(_args, 'param.where.businessRuleId', _root.id);
      return service.findAll(_args.param);
    },
  },
};
