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

/**
 * 获取表字断 字符串
 * @param {*} tableName
 */
const findColumnName = async (tableName, queryInterface, t) => {
  const sql = `select concat('${tableName}.',COLUMN_NAME,' as \`${tableName}_',COLUMN_NAME,'\`') as columnName from information_schema.COLUMNS 
    where table_name = '${tableName}' and table_schema = '${queryInterface.sequelize.config.database}';`;
  return query(sql, queryInterface, t);
};

const nextId = () => {
  return _.toString(intformat(flakeIdgen.next(), 'dec'));
};

module.exports = { query, nextId, findColumnName };
