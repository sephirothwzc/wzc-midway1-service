const resolverUtil = require('../utils/resolver.util');
const { Query, Mutation, getService } = resolverUtil('file');
const _ = require('lodash');

module.exports = {
  Query,
  Mutation,
  File: {},
};
