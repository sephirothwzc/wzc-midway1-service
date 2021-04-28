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
      'capital_account',
      {
        ...parentColumn,
        enterprise_id: {
          type: STRING(50),
          references: references('enterprise'),
          comment: '企业信息id',
        },
        has_enterprise: {
          type: STRING(50),
          comment: '是否企业',
        },
        code: {
          type: STRING(50),
          comment: '账户编号',
        },
        name: {
          type: STRING(50),
          comment: '账户名称',
        },
        status: {
          type: STRING(50),
          comment: '状态',
        },
        bank_deposit: {
          type: STRING(50),
          comment: '开户银行',
        },
        bank_account: {
          type: STRING(50),
          comment: '开户银行账号',
        },
        bank_number: {
          type: STRING(50),
          comment: '开户银行行号',
        },
      },
      {
        comment: '资金账户',
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
    await queryInterface.dropTable('capital_account');
  },
};
