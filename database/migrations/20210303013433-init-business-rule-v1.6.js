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
      'business_rule',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        rule_code: {
          type: STRING(50),
          comment: '规则编码[unique]',
        },
        rule_name: {
          type: STRING(50),
          comment: '规则名称[unique]',
        },
        rule_value: {
          type: JSON,
          comment: '规则',
        },
      },
      {
        comment: '业务编码规则',
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
    await queryInterface.dropTable('business_rule');
  },
};
