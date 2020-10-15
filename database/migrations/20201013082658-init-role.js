'use strict';
const parentColumn = require('../utils/parent-column');
const references = require('../utils/references');
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
      'role',
      {
        ...parentColumn,
        role_name: {
          type: STRING(50),
          allowNull: false,
          comment: '角色名称',
        },
        role_code: {
          type: STRING(50),
          allowNull: false,
          defaultValue: '',
          comment: '角色编码',
        },
      },
      {
        comment: '角色',
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
    await queryInterface.dropTable('role');
  },
};
