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
      'work_flow',
      {
        ...parentColumn,
        app_id: {
          type: STRING(50),
          references: references('app_client'),
          comment: 'app_client',
        },
        name: {
          type: STRING(50),
          comment: '名称',
        },
        code: {
          type: STRING(50),
          comment: '编码',
        },
        version: {
          type: INTEGER,
          comment: '版本',
        },
        graph: {
          type: JSON,
          comment: '图形数据',
        },
      },
      {
        comment: '工作流',
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
    await queryInterface.dropTable('work_flow');
  },
};
