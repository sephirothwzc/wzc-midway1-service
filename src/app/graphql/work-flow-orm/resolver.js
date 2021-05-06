const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('workFlowOrm');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  WorkFlowOrm: {
    workFlowIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'workFlow');
      return service.fetchById(_root.workFlowId);
    },
    formUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.formUserId);
    },
    managerUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.managerUserId);
    },
    undertakeUserIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'appUser');
      return service.fetchById(_root.undertakeUserId);
    },
  },
};
