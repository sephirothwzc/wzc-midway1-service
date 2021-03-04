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
      'role_group_item',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        role_id: {
          type: STRING(50),
          references: references('role'),
          comment: '角色id',
        },
        role_group_id: {
          type: STRING(50),
          references: references('role_group'),
          comment: '角色组id',
        },
        weight: {
          type: INTEGER,
          comment: '权重',
          defaultValue: 0,
        },
      },
      {
        comment: '角色组明细',
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
    await queryInterface.dropTable('role_group_item');
  },
};
