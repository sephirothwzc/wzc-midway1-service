const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService, findUnionTypeString } =
  resolverUtil('workFlowOrm');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  WorkFlowOrm: {
    formCustomSchemaIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'formCustomSchema');
      return service.fetchById(_root.formCustomSchemaId);
    },
    workFlowIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlow');
      return service.fetchById(_root.workFlowId);
    },
    createWorkIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'appUser');
      return service.fetchById(_root.createWorkId);
    },
    workFlowOrmUserWorkFlowOrmId: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowOrmUser');
      _.set(_args, 'param.where.workFlowOrmId', _root.id);
      return service.findAll(_args.param);
    },
    ormIdModel: async (_root, _args, ctx, _info) => {
      if (!_root.ormType || _root.ormType === 'none') {
        return {};
      }
      const service = await getService(ctx, _root.ormType);
      return service.fetchById(_root.ormId);
    },
    /**
     * 工作流节点布局 为空则默认
     * @param {*} _root
     * @param {*} _args
     * @param {*} ctx
     * @param {*} _info
     * @returns
     */
    workFlowGraph: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx, 'workFlowOrm');
      return service.workFlowGraph(_root);
    },
  },
  OrmIdModel: {
    __resolveType: findUnionTypeString,
  },
};
