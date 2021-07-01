'use strict';
const { query, findColumnName } = require('../utils/sql-helper');
const Bb = require('bluebird');

const view_name = 'v_budget';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const columnList = await Bb.map(
      [('budget', 'project_budget', 'project')],
      async (p) => {
        const colList = await findColumnName(p, queryInterface);
        return colList.map((x) => x.columnName).join(',');
      }
    );
    const columnString = columnList.join(',');

    const original_query = `select ${columnString} from budget  inner join 
project_budget  on budget.id = project_budget.budget_id 
inner join project 
on project_budget.project_id = project.id`;

    return queryInterface.sequelize
      .query(`CREATE OR REPLACE VIEW ${view_name} AS ${original_query}`)
      .then((result) => {
        return result;
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.query(
      `DROP VIEW ${view_name}`,
      queryInterface
    );
  },
};
