const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });
const _ = require('lodash');

const query = async (sql, queryInterface) => {
  return queryInterface.sequelize.query(sql, {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  });
};

const nextId = () => {
  return _.toString(intformat(flakeIdgen.next(), 'dec'));
};

module.exports = { query, nextId };
