'use strict';
const { references, allowNull } = require('../utils/references');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const {
      INTEGER,
      DATE,
      STRING,
      DataType,
      ENUM,
      TEXT,
      JSON,
      BOOLEAN,
      DECIMAL,
    } = Sequelize;
    await queryInterface.addColumn('project_his', 'start_date', {
      type: DATE,
      comment: '项目起始时间',
    });
    await queryInterface.addColumn('project_his', 'end_date', {
      type: DATE,
      comment: '项目终止时间',
    });
    await queryInterface.addColumn('project_his', 'investment_amount', {
      type: INTEGER,
      comment: '投资金额',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('project_his', 'start_date');
    await queryInterface.removeColumn('project_his', 'end_date');
    await queryInterface.removeColumn('project_his', 'investment_amount');
  },
};
