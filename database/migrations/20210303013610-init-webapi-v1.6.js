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
      'webapi',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        parent_id: {
          type: STRING(50),
          references: references('webapi'),
          comment: '父级地址id',
        },
        comment: {
          type: STRING(50),
          comment: '说明',
        },
        path: {
          type: STRING(50),
          comment: '路由[unique]',
        },
        code: {
          type: STRING(50),
          comment: '路由编码[unique]',
        },
        params: {
          type: JSON,
          comment: '路由参数',
        },
        method_type: {
          type: STRING(10),
          comment: '请求方法',
        },
        display_code: {
          type: STRING(100),
          comment: '显示编码',
        },
        display_txt: {
          type: STRING(100),
          comment: '显示文本',
        },
        auth_api_state: {
          type: STRING(100),
          comment: '请求权限',
        },
      },
      {
        comment: 'serverapi',
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
    await queryInterface.dropTable('webapi');
  },
};
