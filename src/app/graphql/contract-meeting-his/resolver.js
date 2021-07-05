const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation,  getService } = resolverUtil('contractMeetingHis');
const _ = require('lodash');

module.exports = {
  Query,Mutation,  
  ContractMeetingHis: {
    contractMeetingIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contractMeeting');
      return service.fetchById(_root.contractMeetingId);
    },
    contractIdObj: async (_root, _args, ctx, _info) => {
      const service = await getService(ctx,'contract');
      return service.fetchById(_root.contractId);
    },
  },
};
