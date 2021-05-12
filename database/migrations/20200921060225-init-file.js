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
      'file',
      {
        ...parentColumn,
        fieldname: {
          type: STRING(200),
          allowNull,
          comment: '字断名',
          defaultValue: '',
        },
        filename: {
          type: STRING(200),
          allowNull,
          comment: '文件名',
          defaultValue: '',
        },
        encoding: {
          type: STRING(200),
          allowNull,
          comment: '编码',
          defaultValue: '',
        },
        mime: {
          type: STRING(200),
          allowNull,
          comment: '文件名称',
          defaultValue: '',
        },
        filepath: {
          type: STRING(500),
          allowNull,
          comment: 'tmp 文件路径',
          defaultValue: '',
        },
        oss_name: {
          type: STRING(200),
          allowNull,
          comment: 'oss上传文件id名字',
          defaultValue: '',
        },
        oss_filepath: {
          type: STRING(1000),
          allowNull,
          defaultValue: '',
          comment: 'oss上传完整路径',
          defaultValue: '',
        },
      },
      {
        comment: '文件上传记录表',
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
    await queryInterface.dropTable('file');
  },
};
