const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('workFlow');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  WorkFlow: {},
};
