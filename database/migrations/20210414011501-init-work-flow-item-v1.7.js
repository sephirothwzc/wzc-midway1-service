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
      'work_flow_item',
      {
        ...parentColumn,
        work_flow_id: {
          type: STRING(50),
          references: references('work_flow'),
          comment: '主流程',
        },
        nodeid: {
          type: STRING(50),
          comment: '节点id',
        },
        nodeid: {
          type: STRING(50),
          comment: '节点id',
        },
        text: {
          type: STRING(50),
          comment: '节点文本',
        },
      },
      {
        comment: '工作流明细',
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
    await queryInterface.dropTable('work_flow_item');
  },
};
