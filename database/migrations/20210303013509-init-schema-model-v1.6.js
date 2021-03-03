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
      'schema_model',
      {
        ...parentColumn,
        parent_id: {
          type: STRING(50),
          references: references('schema_model'),
          comment: '父级别',
        },
        name: {
          type: STRING(50),
          comment: '名称[unique]',
        },
        code: {
          type: STRING(50),
          comment: '编码[unique]',
        },
        schema_type: {
          type: STRING(50),
          comment: '[model model 对象,property property 属性]',
        },
        property_type: {
          type: STRING(50),
          comment: '属性类型',
        },
        comment: {
          type: STRING(50),
          comment: '备注',
        },
        display_code: {
          type: STRING(100),
          comment: '显示编码',
        },
        display_txt: {
          type: STRING(100),
          comment: '显示文本',
        },
        property_json: {
          type: JSON,
          comment: '属性json',
        },
        index_json: {
          type: JSON,
          comment: '索引json',
        },
      },
      {
        comment: 'graphql-schema-model',
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
    await queryInterface.dropTable('schema_model');
  },
};
