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
      'role_group',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        group_name: {
          type: STRING(50),
          comment: '组名[unique]',
        },
        group_code: {
          type: STRING(50),
          comment: '组编号[unique]',
        },
      },
      {
        comment: '角色组',
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
    await queryInterface.dropTable('role_group');
  },
};
