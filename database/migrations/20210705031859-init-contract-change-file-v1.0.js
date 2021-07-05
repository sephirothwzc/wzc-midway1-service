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
      'contract_change_file',
      {
        ...parentColumn,
        contract_change_id: {
          type: STRING(50),
          references: references('contract_change'),
          comment: '变更id',
        },
        contract_id: {
          type: STRING(50),
          references: references('contract'),
          comment: '合同id',
        },
        file_type: {
          type: STRING(50),
          comment: '文件类型',
        },
        image_uri: {
          type: STRING(500),
          allowNull,
          defaultVlue: '',
          comment: '域名 默认空，走config的oss url',
        },
        image_path: {
          type: STRING(500),
          allowNull,
          defaultVlue: '',
          comment: '路径',
        },
        image_name: {
          type: STRING(500),
          allowNull,
          comment: '文件名',
          defaultValue: '',
        },
        image_suffix: {
          type: STRING(200),
          allowNull,
          comment: '文件名后缀',
          defaultValue: '',
        },
        image_size: {
          type: INTEGER,
          allowNull,
          comment: '文件大小',
          defaultValue: 0,
        },
      },
      {
        comment: '合同变更文件',
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
    await queryInterface.dropTable('contract_change_file');
  },
};
