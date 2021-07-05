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
      'project_change',
      {
        ...parentColumn,
        project_id: {
          type: STRING(50),
          references: references('project'),
          comment: '项目id',
        },
        change_type: {
          type: STRING(50),
          comment: '变更类型',
        },
        change_remark: {
          type: STRING(500),
          comment: '变更描述',
        },
      },
      {
        comment: '项目变更',
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
    await queryInterface.dropTable('project_change');
  },
};
