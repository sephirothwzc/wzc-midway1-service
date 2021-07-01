'use strict';
const { query } = require('../utils/sql-helper');

const view_name = 'v_budget';
const original_query = '';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await query(
      `CREATE OR REPLACE VIEW ${view_name} AS ${original_query}`,
      queryInterface
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return database.query(`DROP VIEW ${view_name}`);
  },
};
