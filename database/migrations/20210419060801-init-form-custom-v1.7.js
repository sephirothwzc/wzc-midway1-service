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
      'form-custom',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          comment: 'appName',
        },
        form_name: {
          type: STRING(50),
          comment: '表单名称',
        },
        form_code: {
          type: STRING(50),
          comment: '表单编号',
        },
        form_url: {
          type: STRING(200),
          comment: '表单路由',
        },
        form_query: {
          type: JSON,
          comment: '表单路由参数',
        },
        form_param: {
          type: JSON,
          comment: '表单参数',
        },
        display_txt: {
          type: STRING(50),
          comment: '显示文本',
        },
        order_no: {
          type: INTEGER,
          defaultValue: 1,
          allowNull,
          comment: '排序码',
        },
        status: {
          type: STRING(20),
          comment: '状态值',
        },
        step: {
          type: INTEGER,
          comment: '步骤值',
        },
      },
      {
        comment: '自定义表单',
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
    await queryInterface.dropTable('form-custom');
  },
};
