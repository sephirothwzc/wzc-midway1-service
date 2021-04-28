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
      'contract_sign',
      {
        ...parentColumn,
        contract_id: {
          type: STRING(50),
          references: references('contract'),
          comment: '合同id',
        },
        enterprise_id: {
          type: STRING(50),
          references: references('enterprise'),
          comment: '企业信息id',
        },
        enterprise_type: {
          type: STRING(50),
          comment: '签约类型甲方、乙方',
        },
      },
      {
        comment: '签约双方',
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
    await queryInterface.dropTable('contract_sign');
  },
};
