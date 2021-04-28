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
      'contract',
      {
        ...parentColumn,
        project_id: {
          type: STRING(50),
          references: references('project'),
          comment: '项目id',
        },
        project_code: {
          type: STRING(50),
          comment: '项目编号',
        },
        budget_id: {
          type: STRING(50),
          references: references('budget'),
          comment: '预算id',
        },
        contract_code: {
          type: STRING(50),
          comment: '合同编号[unique]',
        },
        contract_name: {
          type: STRING(50),
          comment: '合同名称[unique]',
        },
        contract_type_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '合同类型',
        },
        contract_status_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '合同状态',
        },
        contract_nature_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '合同性质',
        },
        add_user_id: {
          type: STRING(50),
          references: references('app_user'),
          comment: '录入人',
        },
        organization_id: {
          type: STRING(50),
          references: references('organization'),
          comment: '合同归属部门',
        },
        signing_date: {
          type: DATE,
          comment: '签订日期',
        },
        signing_amount: {
          type: INTEGER,
          comment: '签订金额',
        },
        contract_period_start: {
          type: DATE,
          comment: '签订期限起',
        },
        contract_period_end: {
          type: DATE,
          comment: '签订期限止',
        },
        contract_remark: {
          type: STRING(1000),
          comment: '合同备注',
        },
        status: {
          type: STRING(50),
          comment: '合同状态',
        },
      },
      {
        comment: '合同',
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
    await queryInterface.dropTable('contract');
  },
};
