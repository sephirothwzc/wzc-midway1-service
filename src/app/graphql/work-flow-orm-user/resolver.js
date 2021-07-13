const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('workFlowOrmUser');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  WorkFlowOrmUser: {
    workFlowOrmIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'workFlowOrm');
      return service.fetchById(_root.workFlowOrmId);
    },
    formUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.formUserId);
    },
    handleUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.handleUserId);
    },
  },
};
