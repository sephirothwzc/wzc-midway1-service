const { DateResolver, GraphQLJSONObject } = require('graphql-scalars');

module.exports = {
  Date: DateResolver,
  JSONObject: GraphQLJSONObject,
};
