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
      'project_group',
      {
        ...parentColumn,
        project_group_code: {
          type: STRING(50),
          comment: '项目组编号[unique]',
        },
        name: {
          type: STRING(50),
          comment: '项目组名称',
        },
        synopsis: {
          type: STRING(200),
          comment: '项目组简介',
        },
        investment_year: {
          type: INTEGER,
          comment: '投资年度',
        },
        start_date: {
          type: DATE,
          comment: '项目起始时间',
        },
        end_date: {
          type: DATE,
          comment: '项目终止时间',
        },
        investment_amount: {
          type: INTEGER,
          comment: '投资金额',
        },
      },
      {
        comment: '项目组',
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
    await queryInterface.dropTable('project_group');
  },
};
