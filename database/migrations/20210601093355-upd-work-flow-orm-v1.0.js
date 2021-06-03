'use strict';
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
    await queryInterface.addColumn('work_flow_orm', 'reject_remark', {
      type: STRING(500),
      comment: '驳回备注',
    });
    await queryInterface.addColumn('work_flow_orm', 'node_name', {
      type: STRING(200),
      comment: '工作流节点名称',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('work_flow_orm', 'reject_remark');
    await queryInterface.removeColumn('work_flow_orm', 'node_name');
  },
};
