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
      'work_flow_node_form',
      {
        ...parentColumn,
        form_custom_id: {
          type: STRING(50),
          references: references('form_custom'),
          comment: '自定义表单id',
        },
        form_custom_schema_id: {
          type: STRING(50),
          references: references('form_custom_schema'),
          comment: '自定义表单布局id',
        },
        flow_node_id: {
          type: STRING(50),
          comment: '工作流节点id',
        },
        xrender: {
          type: JSON,
          comment: 'schema',
        },
        type: {
          type: STRING(50),
          comment: '类型form、list',
        },
        url_graphql: {
          type: STRING(50),
          comment: 'gql地址',
        },
        finish_graphql: {
          type: TEXT('MEDIUMTEXT'),
          comment: '提交graphql',
        },
        init_graphql: {
          type: TEXT('MEDIUMTEXT'),
          comment: '加载graphql',
        },
        req_fun: {
          type: TEXT('MEDIUMTEXT'),
          comment: '自定义函数对象集合',
        },
        finish_fun: {
          type: TEXT('MEDIUMTEXT'),
          comment: 'finish自定义函数',
        },
        init_fun: {
          type: TEXT('MEDIUMTEXT'),
          comment: '加载自定义函数',
        },
        version: {
          type: INTEGER,
          comment: '版本',
        },
      },
      {
        comment: '工作流节点表单',
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
    await queryInterface.dropTable('work_flow_node_form');
  },
};
