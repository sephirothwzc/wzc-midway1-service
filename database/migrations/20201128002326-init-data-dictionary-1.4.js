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
      'data_dictionary',
      {
        ...parentColumn,
        key: {
          type: STRING(50),
          allowNull: false,
          comment: '英文数字组成禁止标点符号',
        },
        value: {
          type: STRING(50),
          allowNull: false,
          comment: '字典值',
        },
        display_code: {
          type: STRING(50),
          allowNull: false,
          comment: '显示编码',
        },
        display_txt: {
          type: STRING(50),
          allowNull: false,
          comment: '显示值',
        },
        status: {
          type: STRING(50),
          allowNull: false,
          defaultValue: 'Y',
          comment: 'Y启用N停用',
        },
        parent_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '父级地址id',
        },
        description: {
          type: STRING(50),
          comment: '说明文本',
        },
      },
      {
        comment: '数据字典',
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
    await queryInterface.dropTable('data_dictionary');
  },
};
