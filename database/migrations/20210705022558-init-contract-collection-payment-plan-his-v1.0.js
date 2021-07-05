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
      'contract_collection_payment_plan_his',
      {
        ...parentColumn,
        contract_collection_payment_plan_id: {
          type: STRING(50),
          references: references('contract_collection_payment_plan'),
          comment: '合同收款计划id',
        },
        contract_id: {
          type: STRING(50),
          references: references('contract'),
          comment: '合同id',
        },
        mode: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '收款方式',
        },
        type: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '收款类型',
        },
        collected_amount: {
          type: INTEGER,
          comment: '收款金额',
        },
        collected_proportion: {
          type: INTEGER,
          comment: '收款比例',
        },
        collected_time: {
          type: DATE,
          comment: '收款时间',
        },
        collected_remark: {
          type: DATE,
          comment: '收款备注',
        },
        status: {
          type: STRING(50),
          comment: '计划状态',
        },
        collected_remark: {
          type: STRING(500),
          comment: '预算来源文件号',
        },
      },
      {
        comment: '合同收款计划历史',
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
    await queryInterface.dropTable('contract_collection_payment_plan_his');
  },
};
