const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });
const _ = require('lodash');

const query = async (sql, queryInterface, t, type) => {
  const qt = type
    ? _.get(
        queryInterface,
        `sequelize.QueryTypes.${_.toUpper(type)}`,
        queryInterface.sequelize.QueryTypes.SELECT
      )
    : queryInterface.sequelize.QueryTypes.SELECT;
  return queryInterface.sequelize.query(sql, {
    type: qt,
    transaction: t,
  });
};

const nextId = () => {
  return _.toString(intformat(flakeIdgen.next(), 'dec'));
};

module.exports = { query, nextId };
