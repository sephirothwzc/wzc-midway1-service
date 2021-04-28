'use strict';
const parentColumn = require('../utils/parent-column');
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
    await queryInterface.createTable(
      'budget',
      {
        ...parentColumn,
        budget_code: {
          type: STRING(50),
          comment: '预算编号[unique]',
        },
        department: {
          type: STRING(50),
          references: references('organization'),
          comment: '科室id',
        },
        principle: {
          type: STRING(50),
          comment: '预算原则',
        },
        income_money: {
          type: INTEGER,
          comment: '收入金额',
        },
        expenditure_money: {
          type: INTEGER,
          comment: '支出金额',
        },
        status: {
          type: STRING(50),
          comment: '预算状态',
        },
      },
      {
        comment: '预算',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('budget');
  },
};
