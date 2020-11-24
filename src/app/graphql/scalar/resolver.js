const {
  DateResolver,
  GraphQLJSONObject,
  DateTimeResolver,
} = require('graphql-scalars');

module.exports = {
  Date: DateResolver,
  JSONObject: GraphQLJSONObject,
  DateTime: DateTimeResolver,
};
