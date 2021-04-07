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
      'app_user_role',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        app_user_id: {
          type: STRING(50),
          references: references('app_user'),
          comment: '用户',
        },
        type_id: {
          type: STRING(50),
          comment: '角色id、角色组id',
        },
        role_type: {
          type: STRING(50),
          comment: 'role、roleGroup',
          defaultValue: 'role',
        },
      },
      {
        comment: '用户角色关系',
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
    await queryInterface.dropTable('app_user_role');
  },
};
