const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('role');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  Role: {
    businessSchemaRoleId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'businessSchema');
      _.set(_args, 'param.where.roleId', _root.id);
      return service.findAll(_args.param);
    },
    componentControlerRoleRoleId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'componentControlerRole');
      _.set(_args, 'param.where.roleId', _root.id);
      return service.findAll(_args.param);
    },
    roleGroupItemRoleId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'roleGroupItem');
      _.set(_args, 'param.where.roleId', _root.id);
      return service.findAll(_args.param);
    },
    routerRoleRoleId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'routerRole');
      _.set(_args, 'param.where.roleId', _root.id);
      return service.findAll(_args.param);
    },
    schemaModelRoleRoleId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'schemaModelRole');
      _.set(_args, 'param.where.roleId', _root.id);
      return service.findAll(_args.param);
    },
    webapiRoleRoleId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'webapiRole');
      _.set(_args, 'param.where.roleId', _root.id);
      return service.findAll(_args.param);
    },
    appUserRoleTypeId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUserRole');
      _.set(_args, 'param.where.typeId', _root.id);
      _.set(_args, 'param.where.roleType', 'role');
      return service.findAll(_args.param);
    },
  },
};
