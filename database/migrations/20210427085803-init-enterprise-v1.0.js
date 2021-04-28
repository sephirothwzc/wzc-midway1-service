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
      'enterprise',
      {
        ...parentColumn,
        name: {
          type: STRING(1000),
          comment: '企业名称',
        },
        enterprise_type_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '企业类型',
        },
        address: {
          type: STRING(1000),
          comment: '企业注册地址',
        },
        contacts: {
          type: STRING(50),
          comment: '联系人',
        },
        contacts_phone: {
          type: STRING(50),
          comment: '联系人电话',
        },
        enterprise_status: {
          type: STRING(50),
          comment: '状态',
        },
      },
      {
        comment: '企业信息',
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
    await queryInterface.dropTable('enterprise');
  },
};
