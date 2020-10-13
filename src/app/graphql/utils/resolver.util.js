/*
 * @Author: zhanchao.wu
 * @Date: 2020-08-15 21:38:25
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-09-28 14:08:54
 */
const { ROUTER_SCHEMA } = require('../../../lib/utils/const-string');

module.exports = (serviceName) => {
  const getService = async (ctx, otherName = serviceName) => {
    const service = await ctx.requestContext.getAsync(`${otherName}Service`);
    if (!service) {
      throw new Error(`[resolver.util] serviceName not find services inject!`);
    }
    return service;
  };

  const validationSchema = async (ctx, otherName = serviceName, param) => {
    await ctx.app.applicationContext.getAsync(ROUTER_SCHEMA).then((schema) => {
      const schemaItem = schema[otherName];
      if (!schemaItem) {
        return;
      }
      const { error, value } = schemaItem.validate(param);
      if (error) {
        throw new Error(error.message);
      }
    });
  };

  return {
    getService,
    Query: {
      // user
      [serviceName]: async (_root, _args, ctx, _info) => {
        const service = await getService(ctx);
        return service.fetchById(_args.id);
      },
      // userList
      [`${serviceName}List`]: async (_root, _args, ctx, _info) => {
        const service = await getService(ctx);
        return service.findList(_args.param);
      },
      // userAll
      [`${serviceName}All`]: async (_root, _args, ctx, _info) => {
        const service = await getService(ctx);
        return service.findAll(_args.param);
      },
    },
    Mutation: {
      [serviceName]: async (_root, _args, ctx, _info) => {
        await validationSchema(
          ctx,
          `${serviceName}Mutation${_args.param.id ? 'Update' : 'Create'}`,
          _args.param
        );
        const service = await getService(ctx);
        return service.save(_args.param, _args.must);
      },
      // userBulk
      [`${serviceName}Bulk`]: async (_root, _args, ctx, _info) => {
        await validationSchema(ctx, `${serviceName}BulkMutation`, _args.param);
        const service = await getService(ctx);
        return service.bulkCreate(_args.param);
      },
      // userD
      [`${serviceName}Destroy`]: async (_root, _args, ctx, _info) => {
        await validationSchema(ctx, `${serviceName}Destroy`, _args.param);
        const service = await getService(ctx);
        return service.destroy(_args.where, _args.limit);
      },
    },
  };
};
