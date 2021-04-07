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
      'router',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        parent_id: {
          type: STRING(50),
          references: references('router'),
          comment: '父级地址id',
        },
        router_name: {
          type: STRING(100),
          comment: '路由名称',
        },
        router_code: {
          type: STRING(100),
          comment: '路由编码',
        },
        component_id: {
          type: STRING(50),
          references: references('component'),
          comment: '组件id',
        },
        display_code: {
          type: STRING(100),
          comment: '显示编码',
        },
        display_txt: {
          type: STRING(100),
          comment: '显示文本',
        },
      },
      {
        comment: '前端路由',
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
    await queryInterface.dropTable('router');
  },
};
