const _ = require('lodash');

module.exports = {
  Query: {
    aggregate: async (_root, _args, ctx, _info) => {
      const service = await ctx.requestContext.getAsync(`commonService`);
      return service.aggregate(
        ctx,
        _args.modelName,
        _args.field,
        _args.aggregateFunction,
        _args.options
      );
    },
    findAll: async (_root, _args, ctx, _info) => {
      const service = await ctx.requestContext.getAsync(`commonService`);
      return service.findAll(ctx, _args.modelName, _args.options);
    },
  },
};
