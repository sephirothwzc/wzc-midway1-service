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
      'budget_allocation',
      {
        ...parentColumn,
        project_aid: {
          type: STRING(50),
          references: references('project'),
          comment: '项目aid',
        },
        budget_aid: {
          type: STRING(50),
          references: references('budget'),
          comment: '预算aid',
        },
        project_bid: {
          type: STRING(50),
          references: references('project'),
          comment: '项目bid',
        },
        budget_bid: {
          type: STRING(50),
          references: references('budget'),
          comment: '预算bid',
        },
        amount: {
          type: INTEGER,
          comment: '预算金额',
        },
      },
      {
        comment: '预算调拨',
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
    await queryInterface.dropTable('budget_allocation');
  },
};
